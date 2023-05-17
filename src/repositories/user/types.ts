import { type UserStructure, type UserCredentials } from "../../types";

export interface UserRepository {
  loginUser: (credentials: UserCredentials) => Promise<UserStructure>;
}
