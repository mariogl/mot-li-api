import { Schema, model } from "mongoose";
import { type UserStructure } from "../../types";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
    required: true,
  },
});

const User = model<UserStructure>("User", userSchema, "users");

export default User;
