import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../CustomError/CustomError.js";
import { type CustomRequest } from "../../types";

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("authorization");

    if (!authHeader?.includes("Bearer ")) {
      throw new CustomError("Missing token", 401);
    }

    const token = authHeader.replace("Bearer ", "");

    const userPayload = jwt.verify(token, process.env.JWT_SECRET!);

    req.userId = userPayload.sub as string;

    next();
  } catch (error: unknown) {
    const customError =
      (error as CustomError).name === "JsonWebTokenError"
        ? new CustomError("Invalid token", 401)
        : error;

    next(customError);
  }
};
