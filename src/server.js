import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import pino from "pino-http";
import cors from "cors";
import { initMongoConnection } from "./db/models/initMongoConnection.js";
import contactRouter from "./routers/contactRouter.js";
import authRouter from "./routers/authRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import cookieParser from "cookie-parser";
dotenv.config();

export const setupServer = async () => {
  const app = express();
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

  app.use(cors());
  app.use(cookieParser());
  await initMongoConnection();
  app.use("/api/contacts", contactRouter);
  app.use("/api/auth", authRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
};

setupServer();
