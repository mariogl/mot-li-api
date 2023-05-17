import { Types } from "mongoose";
import { type UserStructure } from "../types";

export const mockUser: UserStructure = {
  _id: new Types.ObjectId(),
  lastLogin: new Date(),
  username: "test",
  password: "test-password",
};
