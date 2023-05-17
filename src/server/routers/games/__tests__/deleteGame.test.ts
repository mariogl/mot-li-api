import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose, { Types } from "mongoose";
import Game from "../../../../database/models/Game";
import { mockGameRequests, mockGames } from "../../../../mocks/games";
import app from "../../..";
import connectToDatabase from "../../../../database/connectToDatabase";
import {
  type GameDataRequestStructure,
  type GameStructure,
} from "../../../../types";

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

describe("Given a DELETE /games/:gameId endpoint", () => {
  describe("When it receives a request with a game id", () => {
    test("Then it should respond with a 200 status and the game id", async () => {
      const mockGame = mockGames[0] as GameStructure;

      const response: { body: { game: GameStructure } } = await request(app)
        .delete(`/games/${mockGame._id.toString()}`)
        .expect(200);

      expect(response.body).toHaveProperty("id", mockGame._id.toString());
    });
  });

  describe("When it receives a request with an inexistent id", () => {
    test("Then it should respond with a 404 error", async () => {
      const mockGame = mockGames[0] as GameStructure;
      mockGame._id = new Types.ObjectId();

      const response = await request(app)
        .delete(`/games/${mockGame._id.toString()}`)
        .expect(404);

      expect(response.body).toHaveProperty("error", "Game not found");
    });
  });
});
