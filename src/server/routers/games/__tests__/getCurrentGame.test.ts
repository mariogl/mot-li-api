import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import Game from "../../../../database/models/Game";
import { mockGames } from "../../../../mocks/games";
import app from "../../..";
import connectToDatabase from "../../../../database/connectToDatabase";
import { type GameDataStructure, type GameStructure } from "../../../../types";

let server: MongoMemoryServer;
let mockTodayGame: GameDataStructure;

beforeAll(async () => {
  server = await MongoMemoryServer.create();

  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();

  await server.stop();
});

beforeEach(async () => {
  mockTodayGame = mockGames[1];
  const mockTomorrowGame = mockGames[0];
  mockTomorrowGame.date = new Date(new Date().getDate() + 1);

  await Game.create(mockTomorrowGame);
  await Game.create(mockTodayGame);
});

afterEach(async () => {
  await Game.deleteMany({});
});

describe("Given a GET /games/current endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status and the current day's game", async () => {
      const response: { body: { game: GameStructure } } = await request(app)
        .get("/games/current")
        .expect(200);

      expect(response.body.game).toHaveProperty("word", mockTodayGame.word);
    });
  });
});
