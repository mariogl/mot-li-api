import { Router } from "express";
import { validate } from "express-validation";
import { loginUser } from "../../controllers/user/userControllers.js";
import UserMongoRepository from "../../../repositories/user/UserMongoRepository.js";
import { loginUserSchema } from "../../schemas/userSchemas.js";

const userRepository = new UserMongoRepository();

const userRouter = Router();

userRouter.post(
  "/login",
  validate(loginUserSchema, {}, { abortEarly: false }),
  loginUser(userRepository)
);

export default userRouter;
