import { Router } from "express";
import { getGames } from "../../controllers/games/gamesControllers.js";
import GamesMongoRepository from "../../../repositories/games/GamesMongoRepository.js";

const gamesRepository = new GamesMongoRepository();

const gamesRouter = Router();

gamesRouter.get("/", getGames(gamesRepository));

export default gamesRouter;