import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import connectDB from "./services/db";
import errorRoutes from "./api/error.routes";
import { authorization } from "./services/auth.middleware";

dotenv.config();

const app: Express = express();

// Logging the uncaught exception error message
process.on("uncaughtException", (error) => {
  console.error("There was an uncaught error", error);
  process.exit(1); // mandatory (as per the Node.js docs)
});

app.use(helmet());
app.use(cors());
app.use(express.json());

// HTTP request logger
app.use(morgan("short"));

// Basic auth
app.use(authorization);
// Routes
app.use(routes);
app.use(errorRoutes);

const host: string = process.env.HOST || "http://localhost";
const port: string = process.env.PORT || "8080";

// Start server
app.listen(port, async () => {
  console.log(`TODO Server is running on port: ${port}`);
  console.log(`Homepage: ${host}:${port}`);
  // Connect to the database
  await connectDB();
  // TODO connect to redis
});
