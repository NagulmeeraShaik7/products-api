import { AuthUsecase } from "../usecases/auth.usecase.mjs";
import { AuthRepository } from "../repositories/auth.repository.mjs";

const authUsecase = new AuthUsecase(new AuthRepository());

/**
 * Controller for handling authentication-related HTTP requests.
 */
export class AuthController {
  /**
   * Registers a new user.
   * @param {Object} req - The HTTP request object containing user data in req.body.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<void>} Responds with a JSON object containing the registered user data.
   */
  register = async (req, res, next) => {
    try {
      const result = await authUsecase.registerUser(req.body);
      res.status(201).json({ message: "User registered", data: result });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Authenticates a user and returns a token.
   * @param {Object} req - The HTTP request object containing user credentials in req.body.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<void>} Responds with a JSON object containing the authentication token.
   */
  login = async (req, res, next) => {
    try {
      const token = await authUsecase.loginUser(req.body);
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      next(error);
    }
  };
}