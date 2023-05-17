import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose, { Types } from "mongoose";
import Game from "../../../../database/models/Game";
import { mockGames } from "../../../../mocks/games";
import app from "../../..";
import connectToDatabase from "../../../../database/connectToDatabase";
import { type GameStructure } from "../../../../types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();

  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();

  await server.stop();
});

beforeEach(async () => {
  await Game.create(mockGames[0]);
  await Game.create(mockGames[1]);
});

afterEach(async () => {
  await Game.deleteMany({});
});

describe("Given a PUT /games endpoint", () => {
  describe("When it receives a request with a game to change", () => {
    test("Then it should respond with a 200 status and the game changed", async () => {
      const mockGame = mockGames[0] as GameStructure;
      const newWord = "new-word";
      mockGame.word = newWord;

      const response: { body: { game: GameStructure } } = await request(app)
        .put("/games")
        .send(mockGame)
        .expect(200);

      expect(response.body.game).toHaveProperty("word", newWord);
    });
  });

  describe("When it receives a request with an inexistent id", () => {
    test("Then it should respond with a 404 error", async () => {
      const mockGame = mockGames[0] as GameStructure;
      mockGame._id = new Types.ObjectId();

      const response = await request(app)
        .put("/games")
        .send(mockGame)
        .expect(404);

      expect(response.body).toHaveProperty("error", "Game not found");
    });
  });
});
