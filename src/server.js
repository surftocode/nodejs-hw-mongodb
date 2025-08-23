import dotenv from "dotenv";
import express from "express";
import pino from "pino-http";
import cors from "cors";
import { initMongoConnection } from "./db/models/initMongoConnection.js";
dotenv.config();
const app = express();
app.use(express.json());
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
});

app.use(logger);
app.use(cors());
export const setupServer = async () => {
  await initMongoConnection();

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
};

setupServer();
