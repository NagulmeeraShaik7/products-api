import { AuthUsecase } from './auth.usecase.mjs';
import { AuthRepository } from '../repositories/auth.repository.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  ROLES,
  ERROR_MESSAGES,
  TOKEN_CONSTANTS,
} from '../../../infrasructure/constants/constants.mjs';

// Mock dependencies
jest.mock('../repositories/auth.repository.mjs');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthUsecase', () => {
  let authUsecase;
  let mockAuthRepository;

  beforeEach(() => {
    mockAuthRepository = new AuthRepository();
    authUsecase = new AuthUsecase(mockAuthRepository);
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    const mockUserData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };
    const mockHashedPassword = 'hashedpassword';
    const mockCreatedUser = {
      _id: '123',
      ...mockUserData,
      password: mockHashedPassword,
      role: ROLES.CUSTOMER,
    };

    it('should register a new user with default customer role', async () => {
      mockAuthRepository.findByEmail.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue(mockHashedPassword);
      mockAuthRepository.createUser.mockResolvedValue(mockCreatedUser);

      const result = await authUsecase.registerUser(mockUserData);

      expect(mockAuthRepository.findByEmail).toHaveBeenCalledWith(mockUserData.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 10);
      expect(mockAuthRepository.createUser).toHaveBeenCalledWith({
        ...mockUserData,
        password: mockHashedPassword,
        role: ROLES.CUSTOMER,
      });
      expect(result).toEqual(mockCreatedUser);
    });

    it('should register a new user with specified role', async () => {
      const mockAdminUserData = { ...mockUserData, role: ROLES.ADMIN };
      const mockCreatedAdminUser = { ...mockCreatedUser, role: ROLES.ADMIN };

      mockAuthRepository.findByEmail.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue(mockHashedPassword);
      mockAuthRepository.createUser.mockResolvedValue(mockCreatedAdminUser);

      const result = await authUsecase.registerUser(mockAdminUserData);

      expect(mockAuthRepository.findByEmail).toHaveBeenCalledWith(mockUserData.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 10);
      expect(mockAuthRepository.createUser).toHaveBeenCalledWith({
        ...mockAdminUserData,
        password: mockHashedPassword,
      });
      expect(result).toEqual(mockCreatedAdminUser);
    });

    it('should throw an error if user already exists', async () => {
      const existingUser = { _id: '123', email: mockUserData.email };

      mockAuthRepository.findByEmail.mockResolvedValue(existingUser);

      await expect(authUsecase.registerUser(mockUserData)).rejects.toThrow(
        ERROR_MESSAGES.USER_EXISTS
      );
      expect(mockAuthRepository.findByEmail).toHaveBeenCalledWith(mockUserData.email);
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(mockAuthRepository.createUser).not.toHaveBeenCalled();
    });

    it('should throw an error if bcrypt hash fails', async () => {
      const mockError = new Error('Hashing error');

      mockAuthRepository.findByEmail.mockResolvedValue(null);
      bcrypt.hash.mockRejectedValue(mockError);

      await expect(authUsecase.registerUser(mockUserData)).rejects.toThrow('Hashing error');
      expect(mockAuthRepository.findByEmail).toHaveBeenCalledWith(mockUserData.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 10);
      expect(mockAuthRepository.createUser).not.toHaveBeenCalled();
    });
  });

  describe('loginUser', () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };
    const mockUser = {
      _id: '123',
      email: mockCredentials.email,
      password: 'hashedpassword',
      role: ROLES.CUSTOMER,
    };
    const mockToken = 'jwt.token.here';

    beforeEach(() => {
      // Mock process.env.JWT_SECRET
      process.env.JWT_SECRET = 'secret';
    });

    it('should login a user and return a JWT token', async () => {
      mockAuthRepository.findByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue(mockToken);

      const result = await authUsecase.loginUser(mockCredentials);

      expect(mockAuthRepository.findByEmail).toHaveBeenCalledWith(mockCredentials.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockCredentials.password, mockUser.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser._id, role: mockUser.role },
        process.env.JWT_SECRET,
        { expiresIn: TOKEN_CONSTANTS.EXPIRES_IN }
      );
      expect(result).toEqual(mockToken);
    });

    it('should throw an error if user is not found', async () => {
      mockAuthRepository.findByEmail.mockResolvedValue(null);

      await expect(authUsecase.loginUser(mockCredentials)).rejects.toThrow(
        ERROR_MESSAGES.INVALID_CREDENTIALS
      );
      expect(mockAuthRepository.findByEmail).toHaveBeenCalledWith(mockCredentials.email);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should throw an error if password is incorrect', async () => {
      mockAuthRepository.findByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await expect(authUsecase.loginUser(mockCredentials)).rejects.toThrow(
        ERROR_MESSAGES.INVALID_CREDENTIALS
      );
      expect(mockAuthRepository.findByEmail).toHaveBeenCalledWith(mockCredentials.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockCredentials.password, mockUser.password);
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should throw an error if JWT signing fails', async () => {
      const mockError = new Error('JWT signing error');

      mockAuthRepository.findByEmail.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockImplementation(() => {
        throw mockError;
      });

      await expect(authUsecase.loginUser(mockCredentials)).rejects.toThrow('JWT signing error');
      expect(mockAuthRepository.findByEmail).toHaveBeenCalledWith(mockCredentials.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockCredentials.password, mockUser.password);
      expect(jwt.sign).toHaveBeenCalled();
    });
  });
});