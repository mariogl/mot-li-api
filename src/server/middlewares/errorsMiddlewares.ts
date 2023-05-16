import { type NextFunction, type Request, type Response } from "express";
import chalk from "chalk";
import CustomError from "../../CustomError/CustomError.js";

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Endpoint not found", 404);

  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error instanceof CustomError ? error.statusCode : 500;
  const errorMessage =
    error instanceof CustomError ? error.publicMessage : "General error";

  console.log(chalk(`Error: `, error.message));

  res.status(statusCode).json({ error: errorMessage });
};
