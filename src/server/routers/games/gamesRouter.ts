import { Router } from "express";
import { addGame, getGames } from "../../controllers/games/gamesControllers.js";
import GamesMongoRepository from "../../../repositories/games/GamesMongoRepository.js";

const gamesRepository = new GamesMongoRepository();

const gamesRouter = Router();

gamesRouter.get("/", getGames(gamesRepository));
gamesRouter.post("/", addGame(gamesRepository));

export default gamesRouter;
