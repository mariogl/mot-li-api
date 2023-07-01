import { Router } from "express";
import { validate } from "express-validation";
import GamesMongoRepository from "../../../repositories/games/GamesMongoRepository.js";
import {
  addGame,
  deleteGame,
  getAllGames,
  getCurrentGame,
  getGameById,
  getGames,
  isWordScheduled,
  updateGame,
} from "../../controllers/games/gamesControllers.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import {
  deleteGameSchema,
  newGameSchema,
  updateGameSchema,
} from "../../schemas/gameSchemas.js";

const gamesRepository = new GamesMongoRepository();

const gamesRouter = Router();

gamesRouter.get(
  "/is-word-scheduled",
  authMiddleware,
  isWordScheduled(gamesRepository)
);
gamesRouter.get("/current", getCurrentGame(gamesRepository));
gamesRouter.get("/", authMiddleware, getGames(gamesRepository));
gamesRouter.get("/all", authMiddleware, getAllGames(gamesRepository));
gamesRouter.get("/:gameId", authMiddleware, getGameById(gamesRepository));
gamesRouter.post(
  "/",
  authMiddleware,
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
