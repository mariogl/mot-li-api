import { Joi } from "express-validation";
import { type UserCredentials } from "../../types";

export const loginUserSchema = {
  body: Joi.object<UserCredentials>({
    password: Joi.string().required(),
  }),
};
