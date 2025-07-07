import { AuthUsecase } from "../usecases/auth.usecase.mjs";
import { AuthRepository } from "../repositories/auth.repository.mjs";

const authUsecase = new AuthUsecase(new AuthRepository());

export class AuthController {
  register = async (req, res, next) => {
    try {
      const result = await authUsecase.registerUser(req.body);
      res.status(201).json({ message: "User registered", data: result });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const token = await authUsecase.loginUser(req.body);
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      next(error);
    }
  };
}
