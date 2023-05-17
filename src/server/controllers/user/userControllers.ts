import dotenv from "dotenv";
dotenv.config();
import { type NextFunction, type Request, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { type UserRepository } from "../../../repositories/user/types";
import { type UserCredentials } from "../../../types";

export const loginUser =
  (userRepository: UserRepository) =>
  async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      UserCredentials
    >,
    res: Response,
    next: NextFunction
  ) => {
    const credentials = req.body;
    try {
      const user = await userRepository.loginUser(credentials);

      const payload: JwtPayload = {
        sub: user._id.toString(),
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET!);

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
