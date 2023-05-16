import express from "express";
import morgan from "morgan";
import { getPong } from "./controllers/ping/pingControllers.js";

const app = express();

app.use(morgan("dev"));

app.get("/", getPong);

export default app;
