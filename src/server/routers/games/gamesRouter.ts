import { Router } from "express";
import {
  addGame,
  deleteGame,
  getCurrentGame,
  getGameById,
  getGames,
  updateGame,
} from "../../controllers/games/gamesControllers.js";
import GamesMongoRepository from "../../../repositories/games/GamesMongoRepository.js";
import { validate } from "express-validation";
import {
  deleteGameSchema,
  newGameSchema,
  updateGameSchema,
} from "../../schemas/gameSchemas.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const gamesRepository = new GamesMongoRepository();

const gamesRouter = Router();

gamesRouter.get("/current", getCurrentGame(gamesRepository));
gamesRouter.get("/", authMiddleware, getGames(gamesRepository));
gamesRouter.get("/:gameId", authMiddleware, getGameById(gamesRepository));
gamesRouter.post(
  "/",
  validate(newGameSchema, {}, { abortEarly: false }),
  addGame(gamesRepository)
);
gamesRouter.delete(
  "/:gameId",
  authMiddleware,
  validate(deleteGameSchema, {}, { abortEarly: false }),
  deleteGame(gamesRepository)
);
gamesRouter.put(
  "/",
  authMiddleware,
  validate(updateGameSchema, {}, { abortEarly: false }),
  updateGame(gamesRepository)
);

export default gamesRouter;
