import { type NextFunction, type Request, type Response } from "express";
import { type GamesRepository } from "../../../repositories/games/types";
import { type GameStructure, type GameDataStructure } from "../../../types";

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

export const deleteGame =
  (gamesRepository: GamesRepository) =>
  async (
    req: Request<{ gameId: string }>,
    res: Response,
    _next: NextFunction
  ) => {
    const { gameId } = req.params;

    await gamesRepository.deleteGame(gameId);

    res.status(200).json({ id: gameId });
  };

export const updateGame =
  (gamesRepository: GamesRepository) =>
  async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      GameStructure
    >,
    res: Response,
    _next: NextFunction
  ) => {
    const game = req.body;

    const updatedGame = await gamesRepository.updateGame(game);

    res.status(200).json({ game: updatedGame });
  };
