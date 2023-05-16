import { Router } from "express";
import { addGame, getGames } from "../../controllers/games/gamesControllers.js";
import GamesMongoRepository from "../../../repositories/games/GamesMongoRepository.js";
import { validate } from "express-validation";
import { newGameSchema } from "../../schemas/gameSchemas.js";

const gamesRepository = new GamesMongoRepository();

const gamesRouter = Router();

gamesRouter.get("/", getGames(gamesRepository));
gamesRouter.post(
  "/",
  validate(newGameSchema, {}, { abortEarly: false }),
  addGame(gamesRepository)
);

export default gamesRouter;
