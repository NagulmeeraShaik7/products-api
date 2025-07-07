import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.mjs";
import {
  ROLES,
  ERROR_MESSAGES,
  TOKEN_CONSTANTS,
} from "../../../infrasructure/constants/constants.mjs";

/**
 * Use case class for handling authentication-related business logic.
 */
export class AuthUsecase {
  /**
   * Creates an instance of AuthUsecase.
   * @param {Object} authRepository - The repository for handling database operations.
   */
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Registers a new user with hashed password.
   * @param {Object} userData - The user data for registration.
   * @param {string} userData.username - The username of the user.
   * @param {string} userData.email - The email address of the user.
   * @param {string} userData.password - The password of the user.
   * @param {string} [userData.role="customer"] - The role of the user, defaults to "customer".
   * @returns {Promise<Object>} The created user document.
   * @throws {Error} If a user with the provided email already exists.
   */
  async registerUser({ username, email, password, role = ROLES.CUSTOMER }) {
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new Error(ERROR_MESSAGES.USER_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.authRepository.createUser({
      username,
      email,
      password: hashedPassword,
      role,
    });
  }

  /**
   * Authenticates a user and generates a JWT token.
   * @param {Object} credentials - The user credentials for login.
   * @param {string} credentials.email - The email address of the user.
   * @param {string} credentials.password - The password of the user.
   * @returns {Promise<string>} The JWT token for the authenticated user.
   * @throws {Error} If the credentials are invalid or the user is not found.
   */
  async loginUser({ email, password }) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: TOKEN_CONSTANTS.EXPIRES_IN,
    });

    return token;
  }
}
