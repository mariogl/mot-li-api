import express from "express";
import morgan from "morgan";
import { getPong } from "./controllers/ping/pingControllers.js";
import gamesRouter from "./routers/games/gamesRouter.js";

const app = express();

app.use(morgan("dev"));

app.get("/", getPong);
app.use("/games", gamesRouter);

export default app;
