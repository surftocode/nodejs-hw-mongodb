import dotenv from "dotenv";
import express from "express";
import pino from "pino-http";
import cors from "cors";
import mongoose from "mongoose";
import pinoPretty from "pino-pretty";
import { initMongoConnection } from "./db/models/initMongoConnection.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

export const setupServer = async () => {
  await initMongoConnection();
  


  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
};

setupServer();
