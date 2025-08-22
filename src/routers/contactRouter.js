import express, { Router } from "express";
import dotenv from "dotenv";
import { notFoundHandler } from "../middlewares/notFoundHandler";
import { errorHandler } from "../middlewares/errorHandler";
import Router from "express-promise-router";
import {
  getAllContacts,
  getContactsById,
} from "../controllers/contactController";
import { ctrlWrapper } from "../utils/ctrlWrapper";
dotenv.config();
const app = express();
app.use(
  express.json({
    type: ["application/json", "application/vnd.api+json"],
  })
);
app.use(cors());
app.use(
  pino({
    transport: {
      target: "pino-pretty",
    },
  })
);
const router=Router();
app.get("/", (req, res) => {
  res.send("server is working");
});

router.get("/contacts", ctrlWrapper(getAllContacts));

router.get("/contacts/:id", ctrlWrapper(getContactsById));

router.use("*", notFoundHandler);
router.use(errorHandler);
