
import { AuthRepository } from './auth.repository.mjs';
import { User } from '../models/user.model.mjs';
import mongoose from 'mongoose';

// Mock the User model
jest.mock('../models/user.model.mjs');

// Increase Jest's default timeout to handle MongoDB operations
jest.setTimeout(10000);

describe('AuthRepository', () => {
  let authRepository;

  beforeAll(async () => {
    // Ensure MongoDB connection is established
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  beforeEach(() => {
    authRepository = new AuthRepository();
    jest.clearAllMocks();
  });

  afterEach(async () => {
    // Clean up the database
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    // Close the MongoDB connection
    await mongoose.disconnect();
  });

  describe('findByEmail', () => {
    it('should find a user by email and return the user document', async () => {
      const mockEmail = 'test@example.com';
      const mockUser = { _id: '123', email: mockEmail, username: 'testuser' };
      
      User.findOne.mockResolvedValue(mockUser);

      const result = await authRepository.findByEmail(mockEmail);

      expect(User.findOne).toHaveBeenCalledWith({ email: mockEmail });
      expect(result).toEqual(mockUser);
    });

    it('should return null if no user is found by email', async () => {
      const mockEmail = 'nonexistent@example.com';
      
      User.findOne.mockResolvedValue(null);

      const result = await authRepository.findByEmail(mockEmail);

      expect(User.findOne).toHaveBeenCalledWith({ email: mockEmail });
      expect(result).toBeNull();
    });

    it('should throw an error if findByEmail fails', async () => {
      const mockEmail = 'test@example.com';
      const mockError = new Error('Database error');
      
      User.findOne.mockRejectedValue(mockError);

      await expect(authRepository.findByEmail(mockEmail)).rejects.toThrow('Database error');
      expect(User.findOne).toHaveBeenCalledWith({ email: mockEmail });
    });
  });

  describe('createUser', () => {
    it('should create a new user and return the user document', async () => {
      const mockUserData = { email: 'test@example.com', username: 'testuser', password: 'hashedpassword' };
      const mockSavedUser = { _id: '123', ...mockUserData };
      
      const mockSave = jest.fn().mockResolvedValue(mockSavedUser);
      User.mockImplementation(() => ({
        save: mockSave,
        ...mockUserData,
      }));

      const result = await authRepository.createUser(mockUserData);

      expect(User).toHaveBeenCalledWith(mockUserData);
      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual(mockSavedUser);
    });

    it('should throw an error if user creation fails', async () => {
      const mockUserData = { email: 'test@example.com', username: 'testuser', password: 'hashedpassword' };
      const mockError = new Error('Database error');
      
      const mockSave = jest.fn().mockRejectedValue(mockError);
      User.mockImplementation(() => ({
        save: mockSave,
        ...mockUserData,
      }));

      await expect(authRepository.createUser(mockUserData)).rejects.toThrow('Database error');
      expect(User).toHaveBeenCalledWith(mockUserData);
      expect(mockSave).toHaveBeenCalled();
    });
  });
});


