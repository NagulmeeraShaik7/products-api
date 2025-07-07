
import { AuthController } from './auth.controller.mjs';
import { AuthUsecase } from '../usecases/auth.usecase.mjs';
import { AUTH_MESSAGES } from '../../../infrasructure/constants/constants.mjs';

jest.mock('../usecases/auth.usecase.mjs');

describe('AuthController', () => {
  let authController;
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    authController = new AuthController();
    mockRequest = {
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
    AuthUsecase.mockClear();
  });

  describe('register', () => {
    it('should register a user successfully and return 201 status', async () => {
      const mockUserData = { id: 1, username: 'testuser' };
      const mockBody = { username: 'testuser', password: 'password123' };
      mockRequest.body = mockBody;
      
      AuthUsecase.prototype.registerUser.mockResolvedValue(mockUserData);

      await authController.register(mockRequest, mockResponse, mockNext);

      expect(AuthUsecase.prototype.registerUser).toHaveBeenCalledWith(mockBody);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: AUTH_MESSAGES.REGISTER_SUCCESS,
        data: mockUserData
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with error when registration fails', async () => {
      const mockError = new Error('Registration failed');
      mockRequest.body = { username: 'testuser', password: 'password123' };
      
      AuthUsecase.prototype.registerUser.mockRejectedValue(mockError);

      await authController.register(mockRequest, mockResponse, mockNext);

      expect(AuthUsecase.prototype.registerUser).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should login a user successfully and return 200 status with token', async () => {
      const mockToken = 'jwt.token.here';
      const mockBody = { username: 'testuser', password: 'password123' };
      mockRequest.body = mockBody;
      
      AuthUsecase.prototype.loginUser.mockResolvedValue(mockToken);

      await authController.login(mockRequest, mockResponse, mockNext);

      expect(AuthUsecase.prototype.loginUser).toHaveBeenCalledWith(mockBody);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: AUTH_MESSAGES.LOGIN_SUCCESS,
        token: mockToken
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with error when login fails', async () => {
      const mockError = new Error('Login failed');
      mockRequest.body = { username: 'testuser', password: 'password123' };
      
      AuthUsecase.prototype.loginUser.mockRejectedValue(mockError);

      await authController.login(mockRequest, mockResponse, mockNext);

      expect(AuthUsecase.prototype.loginUser).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });
});


