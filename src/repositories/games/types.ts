import { type GameDataStructure, type GameStructure } from "../../types";

export interface GamesRepository {
  getGames: () => Promise<GameStructure[]>;
  getCurrentGame: () => Promise<GameStructure>;
  addGame: (game: GameDataStructure) => Promise<GameStructure>;
  deleteGame: (gameId: string) => Promise<string>;
  updateGame: (game: GameStructure) => Promise<GameStructure>;
}
