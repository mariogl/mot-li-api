import { Router } from "express";
import {
  addGame,
  deleteGame,
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

const gamesRepository = new GamesMongoRepository();

const gamesRouter = Router();

gamesRouter.get("/", getGames(gamesRepository));
gamesRouter.post(
  "/",
  validate(newGameSchema, {}, { abortEarly: false }),
  addGame(gamesRepository)
);
gamesRouter.delete(
  "/:gameId",
  validate(deleteGameSchema, {}, { abortEarly: false }),
  deleteGame(gamesRepository)
);
gamesRouter.put(
  "/",
  validate(updateGameSchema, {}, { abortEarly: false }),
  updateGame(gamesRepository)
);

export default gamesRouter;
