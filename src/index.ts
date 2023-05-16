import dotenv from "dotenv";
dotenv.config();
import chalk from "chalk";
import app from "./server/index.js";

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  console.log(chalk.green(`Listening on http://localhost:${port}`));
});
