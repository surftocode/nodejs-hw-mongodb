import dotenv from "dotenv";
import express from "express";
import pino from "pino-http";
import cors from "cors";
import mongoose from "mongoose";
import pinoPretty from "pino-pretty";
import { initMongoConnection } from "./db/initMongoConnection.js";

import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import contactRouter from "./routers/contactRouter.js";

dotenv.config();
const app = express();
app.use(
  express.json({
    "Content-type": "application/json",
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
app.get("/contacts", contactRouter);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Contact API",
    status: "success",
    endpoints: {
      contacts: "/contacts",
    },
  });
});
app.use(notFoundHandler);
app.use(errorHandler);

export const setupServer = async () => {
  await initMongoConnection();

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
};

setupServer();
