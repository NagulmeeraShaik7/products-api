import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.mjs";

export class AuthUsecase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async registerUser({ username, email, password, role = "customer" }) {
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.authRepository.createUser({
      username,
      email,
      password: hashedPassword,
      role,
    });
  }

  async loginUser({ email, password }) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    return token;
  }
}
