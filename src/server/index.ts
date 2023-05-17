import express from "express";
import morgan from "morgan";
import { getPong } from "./controllers/ping/pingControllers.js";
import gamesRouter from "./routers/games/gamesRouter.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorsMiddlewares.js";
import userRouter from "./routers/user/userRouter.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", getPong);
app.use("/games", authMiddleware, gamesRouter);
app.use("/user", userRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
