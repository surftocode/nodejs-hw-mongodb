import dotenv from "dotenv";
import express from "express";
import pino from "pino-http";
import cors from "cors";
import { initMongoConnection } from "./db/models/initMongoConnection.js";
import { router } from "./routers/contactRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(
  express.json({
    type: ["application/json", "application/vnd.api+json"],
  })
);
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
app.use(router);

export const setupServer = async () => {
  await initMongoConnection();

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
};

setupServer();
