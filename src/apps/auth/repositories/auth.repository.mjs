import { User } from "../models/user.model.mjs";

/**
 * Repository class for handling authentication-related database operations.
 */
export class AuthRepository {
  /**
   * Finds a user by their email address.
   * @param {string} email - The email address of the user to find.
   * @returns {Promise<Object|null>} The user document if found, otherwise null.
   */
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  /**
   * Creates a new user in the database.
   * @param {Object} userData - The user data to create a new user.
   * @returns {Promise<Object>} The created user document.
   */
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }
}