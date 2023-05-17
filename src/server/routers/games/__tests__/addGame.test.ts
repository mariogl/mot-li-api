import { MongoMemoryServer } from "mongodb-memory-server";
import bcrypt from "bcryptjs";
import request from "supertest";
import mongoose from "mongoose";
import Game from "../../../../database/models/Game";
import { mockGameRequests, mockGames } from "../../../../mocks/games";
import app from "../../..";
import connectToDatabase from "../../../../database/connectToDatabase";
import {
  type GameDataRequestStructure,
  type GameStructure,
} from "../../../../types";
import User from "../../../../database/models/User";
import { mockUser } from "../../../../mocks/users";

let server: MongoMemoryServer;
let token: string;

beforeAll(async () => {
  server = await MongoMemoryServer.create();

  await connectToDatabase(server.getUri());

  await User.create({
    ...mockUser,
    password: await bcrypt.hash(mockUser.password, 10),
  });

  const response = await request(app)
    .post("/user/login")
    .send({ password: mockUser.password });

  token = response.body.token as string;
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

describe("Given a POST /games endpoint", () => {
  describe("When it receives a request with a game", () => {
    test("Then it should respond with a 201 status and the game with id", async () => {
      const mockGame = mockGameRequests[0];

      const response: { body: { game: GameStructure } } = await request(app)
        .post("/games")
        .send(mockGame)
        .set("authorization", `Bearer ${token}`)
        .expect(201);

      expect(response.body.game).toHaveProperty("word", mockGame.word);
      expect(response.body.game).toHaveProperty("id");
    });
  });

  describe("When it receives a request with an incomplete game", () => {
    test("Then it should respond with a 400 Bad request error", async () => {
      const mockGame: Partial<GameDataRequestStructure> = mockGameRequests[0];

      delete mockGame.date;

      const response = await request(app)
        .post("/games")
        .send(mockGame)
        .set("authorization", `Bearer ${token}`)
        .expect(400);

      expect(response.body).toHaveProperty("error", "date is required");
    });
  });

  describe("When it receives a request without token", () => {
    test("Then it should respond with a 401 status and an error", async () => {
      const response = await request(app).post("/games").expect(401);

      expect(response.body).toHaveProperty("error", "Missing token");
    });
  });
});
