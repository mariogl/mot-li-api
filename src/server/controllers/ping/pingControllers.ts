import { type Request, type Response } from "express";
import moment from "moment-timezone";

moment.tz.setDefault("Europe/Madrid");

export const getPong = (req: Request, res: Response) => {
  const today = moment().format("YYYY-MM-DD HH:mm:ss");

  res.status(200).json({ message: "OK", time: today });
};
