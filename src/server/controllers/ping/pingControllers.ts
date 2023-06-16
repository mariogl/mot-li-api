import { type Request, type Response } from "express";

export const getPong = (req: Request, res: Response) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  res.status(200).json({ message: "OK", time: today });
};
