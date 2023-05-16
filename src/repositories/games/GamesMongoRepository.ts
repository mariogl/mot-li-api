import CustomError from "../../CustomError/CustomError.js";
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
      length: game.word.length,
      date: new Date(new Date(game.date).toUTCString()).setUTCHours(0, 0, 0, 0),
    });

    await newGame.save();

    return newGame;
  }

  async deleteGame(gameId: string): Promise<string> {
    const deletedGame = await Game.findByIdAndDelete(gameId);

    if (!deletedGame) {
      throw new CustomError("Game not found", 404);
    }

    return deletedGame._id.toString();
  }

  async updateGame(game: GameStructure): Promise<GameStructure> {
    const updatedGame = await Game.findByIdAndUpdate(game._id, game, {
      new: true,
    }).lean();

    if (!updatedGame) {
      throw new CustomError("Game not found", 404);
    }

    return updatedGame;
  }
}

export default GamesMongoRepository;
