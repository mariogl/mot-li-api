import { type NextFunction, type Request, type Response } from "express";
import chalk from "chalk";
import CustomError from "../../CustomError/CustomError.js";
import { ValidationError } from "express-validation";

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
  if (error instanceof ValidationError) {
    (error as CustomError).publicMessage = error.details
      .body!.map((error) => error.message.replaceAll('"', ""))
      .join(" & ");
  }

  const statusCode = error.statusCode ?? 500;
  const errorMessage = error.publicMessage ?? "General error";

  console.log(chalk.red(`Error: `, error.message));

  res.status(statusCode).json({ error: errorMessage });
};
