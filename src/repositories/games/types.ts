import { type GameDataStructure, type GameStructure } from "../../types";

export interface GamesRepository {
  getGames: () => Promise<GameStructure[]>;
  addGame: (game: GameDataStructure) => Promise<GameStructure>;
}
