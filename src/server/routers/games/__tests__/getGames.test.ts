import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
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

describe("Given a GET /games endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status and a list of games", async () => {
      const firstMockGame = mockGames[0];
      const secondMockGame = mockGames[1];

      const response: { body: { games: GameStructure[] } } = await request(app)
        .get("/games")
        .expect(200);

      expect(response.body.games[0]).toHaveProperty("word", firstMockGame.word);
      expect(response.body.games[1]).toHaveProperty(
        "word",
        secondMockGame.word
      );
    });
  });
});
