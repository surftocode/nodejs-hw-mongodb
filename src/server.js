import dotenv from "dotenv";
import express from "express";
import pino from "pino-http";
import cors from "cors";
import pinoPretty from "pino-pretty";
import { initMongoConnection } from "./db/models/initMongoConnection.js";
import Contact from "./db/models/Contact.js";
dotenv.config({debug:false});
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
      const contacts = await Contact.find({});

      if (!contacts || contacts.length === 0) {
        return res.status(404).json({
          message: "cannot find contacts.",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
      });
    } catch (error) {
      console.error("error:", error.message);
      res.status(500).json({
        message: "Server error",
      });
    }
  });

  app.get("/contacts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const contactById = await Contact.findById(id);

      if (!contactById) {
        res.status(404).json({
          message: "cannot find id",
        });
      }
      res.status(200).json({
        message: `Succesfully find contact with id ${id}`,
        data: contactById,
      });
    } catch (error) {
      console.error("error:", error.message);
      res.status(500).json({
        message: "Server error",
      });
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
