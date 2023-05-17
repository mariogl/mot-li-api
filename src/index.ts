import dotenv from "dotenv";
dotenv.config();
import chalk from "chalk";
import app from "./server/index.js";
import connectToDatabase from "./database/connectToDatabase.js";

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_CONNECTION;

if (!mongoDbUrl) {
  console.log(chalk.red("Missing env variables"));
  process.exit(1);
}

await connectToDatabase(mongoDbUrl);
console.log(chalk.blue("Connected to database"));
app.listen(port, () => {
  console.log(chalk.green(`Listening on http://localhost:${port}`));
});
