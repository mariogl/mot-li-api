import { type NextFunction, type Request, type Response } from "express";
import { type GamesRepository } from "../../../repositories/games/types";
import { type GameDataStructure } from "../../../types";

export const getGames =
  (gamesRepository: GamesRepository) => async (req: Request, res: Response) => {
    const games = await gamesRepository.getGames();

    res.status(200).json({ games });
  };

export const addGame =
  (gamesRepository: GamesRepository) =>
  async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      GameDataStructure
    >,
    res: Response,
    _next: NextFunction
  ) => {
    const game = req.body;

    const newGame = await gamesRepository.addGame(game);

    res.status(201).json({ game: newGame });
  };
