import dotenv from "dotenv";

dotenv.config();
import express from "express";
import mongoose from "mongoose";
import pino from "pino-http";
import cors from "cors";
import pinoPretty from "pino-pretty";

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  pino({
    transport: {
      target: "pino-pretty",
    },
  })
);

export const setupServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo connection successfully established!");
    app.get("/", (req, res) => {
      res.send("server is working");
    });
    app.use((req, res) => {
      res.status(404).json({
        message: "not found",
      });
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  } catch (err) {
    console.error("hata:", err.message);
    process.exit(1);
  }
};

setupServer();
