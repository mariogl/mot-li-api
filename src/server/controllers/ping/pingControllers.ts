import { type Request, type Response } from "express";

export const getPong = (req: Request, res: Response) => {
  res.status(200).json({
    message: "OK",
  });
};
