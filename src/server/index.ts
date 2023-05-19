import express from "express";
import morgan from "morgan";
import cors from "cors";
import { getPong } from "./controllers/ping/pingControllers.js";
import gamesRouter from "./routers/games/gamesRouter.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorsMiddlewares.js";
import userRouter from "./routers/user/userRouter.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.get("/", getPong);
app.use("/games", gamesRouter);
app.use("/user", userRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
