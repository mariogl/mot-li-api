import { type GameDataStructure, type GameStructure } from "../../types";

export interface GamesRepository {
  isWordScheduled: (word: string) => Promise<boolean>;
  getGames: () => Promise<GameStructure[]>;
  getAllGames: () => Promise<GameStructure[]>;
  getGameById: (gameId: string) => Promise<GameStructure | undefined>;
  getCurrentGame: () => Promise<GameStructure>;
  addGame: (game: GameDataStructure) => Promise<GameStructure>;
  deleteGame: (gameId: string) => Promise<string>;
  updateGame: (game: GameStructure) => Promise<GameStructure>;
}
