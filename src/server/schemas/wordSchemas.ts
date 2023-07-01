import { Joi } from "express-validation";
import { type WordDataStructure } from "../../types";

export const newWordSchema = {
  body: Joi.object<WordDataStructure>({
    word: Joi.string().required(),
  }),
};

export const deleteWordSchema = {
  params: Joi.object({
    wordId: Joi.string().required(),
  }),
};
