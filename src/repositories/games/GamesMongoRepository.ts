import Game from "../../database/models/Game.js";
import { type GameStructure } from "../../types.js";
import { type GamesRepository } from "./types.js";

class GamesMongoRepository implements GamesRepository {
  async getGames(): Promise<GameStructure[]> {
    const games = await Game.find().lean();

    return games;
  }
}

export default GamesMongoRepository;
