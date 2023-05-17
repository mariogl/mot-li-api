import { MongoMemoryServer } from "mongodb-memory-server";
import bcrypt from "bcryptjs";
import request from "supertest";
import mongoose from "mongoose";
import app from "../../..";
import connectToDatabase from "../../../../database/connectToDatabase";
import User from "../../../../database/models/User";
import { mockUser } from "../../../../mocks/users";

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
  await User.create({
    ...mockUser,
    password: await bcrypt.hash(mockUser.password, 10),
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("Given a POST /user/login endpoint", () => {
  describe("When it receives a request with valid credentials", () => {
    test("Then it should respond with a 200 status and a token", async () => {
      const response = await request(app)
        .post("/user/login")
        .send({ password: mockUser.password })
        .expect(200);

      expect(response.body).toHaveProperty("token");
    });
  });

  describe("When it receives a request with invalid credentials", () => {
    test("Then it should respond with a 401 status and an error", async () => {
      const response = await request(app)
        .post("/user/login")
        .send({ password: "wrong" })
        .expect(401);

      expect(response.body).toHaveProperty("error", "Wrong credentials");
    });
  });

  describe("When it receives a request without credentials", () => {
    test("Then it should respond with a 400 Bad request error", async () => {
      const response = await request(app)
        .post("/user/login")
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty("error", "password is required");
    });
  });
});
