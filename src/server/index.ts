import cors from "cors";
import express from "express";
import morgan from "morgan";
import { getPong } from "./controllers/ping/pingControllers.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorsMiddlewares.js";
import gamesRouter from "./routers/games/gamesRouter.js";
import userRouter from "./routers/user/userRouter.js";
import wordsRouter from "./routers/words/wordsRouter.js";

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(","),
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.get("/", getPong);
app.use("/games", gamesRouter);
app.use("/words", wordsRouter);
app.use("/user", userRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
