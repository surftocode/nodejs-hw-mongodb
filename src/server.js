import dotenv from "dotenv";
import express from "express";
import pino from "pino-http";
import cors from "cors";
import mongoose from "mongoose";
import pinoPretty from "pino-pretty";
import { initMongoConnection } from "./db/models/initMongoConnection.js";
import { readFile } from "fs/promises";
import { Contacts } from "./db/models/Contact.js";
dotenv.config();
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
  await initMongoConnection();
  app.get("/", (req, res) => {
    res.send("server is working");
  });

  app.get("/contacts", async (req, res) => {
    try {
      const contacts = await Contacts.find({});
      res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
      });
      if (!contacts) {
        return res.status(404).json({
          message: "cannot find contacts.",
        });
      }
    } catch (error) {
      console.error("error:", error.message);
    }
  });

  app.get("/contacts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const contactById = await contactsInFile.findById(id);
      res.status(200).json(contactById);
      if (!contactById) {
        res.status(404).json({
          message: "cannot find id",
        });
      }
    } catch (error) {
      console.error("error:", error.message);
    }
  });
  app.use((req, res) => {
    res.status(404).json({
      message: "not found",
    });
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
};

setupServer();
