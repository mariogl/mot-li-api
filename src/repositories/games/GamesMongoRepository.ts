import Game from "../../database/models/Game.js";
import { type GameDataStructure, type GameStructure } from "../../types.js";
import { type GamesRepository } from "./types.js";

class GamesMongoRepository implements GamesRepository {
  async getGames(): Promise<GameStructure[]> {
    const games = await Game.find().lean();

    return games;
  }

  async addGame(game: GameDataStructure): Promise<GameStructure> {
    const newGame = new Game({
      ...game,
      date: new Date(new Date(game.date).toUTCString()).setUTCHours(0, 0, 0, 0),
    });

    await newGame.save();

    return newGame;
  }
}

export default GamesMongoRepository;
