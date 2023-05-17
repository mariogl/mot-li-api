import bcrypt from "bcryptjs";
import User from "../../database/models/User.js";
import { type UserStructure, type UserCredentials } from "../../types";
import { type UserRepository } from "./types";
import CustomError from "../../CustomError/CustomError.js";

class UserMongoRepository implements UserRepository {
  async loginUser(credentials: UserCredentials): Promise<UserStructure> {
    const user = await User.findOne();

    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new CustomError("Wrong credentials", 401);
    }

    return user;
  }
}

export default UserMongoRepository;
