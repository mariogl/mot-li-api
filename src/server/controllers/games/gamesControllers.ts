import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { type GamesRepository } from "../../../repositories/games/types";
import { type GameDataStructure, type GameStructure } from "../../../types";

export const isWordScheduled =
  (gamesRepository: GamesRepository) =>
  async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      Record<string, unknown>,
      { word: string }
    >,
    res: Response
  ) => {
    const { word } = req.query;
    const isScheduled = await gamesRepository.isWordScheduled(word);

    res.status(200).json({ isScheduled });
  };

export const getGames =
  (gamesRepository: GamesRepository) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const games = await gamesRepository.getGames();

      res.status(200).json({ games });
    } catch (error) {
      next(error);
    }
  };

export const getAllGames =
  (gamesRepository: GamesRepository) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const games = await gamesRepository.getAllGames();

      res.status(200).json({ games });
    } catch (error) {
      next(error);
    }
  };

export const getGameById =
  (gamesRepository: GamesRepository) =>
  async (
    req: Request<{ gameId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { gameId } = req.params;

      const game = await gamesRepository.getGameById(gameId);

      if (!game) {
        throw new CustomError("Game not found", 404);
      }

      res.status(200).json({ game });
    } catch (error) {
      next(error);
    }
  };

export const getCurrentGame =
  (gamesRepository: GamesRepository) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const game = await gamesRepository.getCurrentGame();

      if (!game) {
        throw new CustomError("Game not found", 404);
      }

      res.status(200).json({ game });
    } catch (error) {
      next(error);
    }
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
    next: NextFunction
  ) => {
    const game = req.body;

    try {
      const newGame = await gamesRepository.addGame(game);

      res.status(201).json({ game: newGame });
    } catch (error) {
      next(error);
    }
  };

export const deleteGame =
  (gamesRepository: GamesRepository) =>
  async (
    req: Request<{ gameId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { gameId } = req.params;

    try {
      await gamesRepository.deleteGame(gameId);

      res.status(200).json({ id: gameId });
    } catch (error) {
      next(error);
    }
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
    next: NextFunction
  ) => {
    const game = req.body;

    try {
      const updatedGame = await gamesRepository.updateGame(game);

      res.status(200).json({ game: updatedGame });
    } catch (error) {
      next(error);
    }
  };
