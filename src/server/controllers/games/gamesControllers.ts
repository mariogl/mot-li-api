import { type Request, type Response } from "express";
import { type GamesRepository } from "../../../repositories/games/types";

export const getGames =
  (gamesRepository: GamesRepository) => async (req: Request, res: Response) => {
    const games = await gamesRepository.getGames();

    res.status(200).json({ games });
  };
