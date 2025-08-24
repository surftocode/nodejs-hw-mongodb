import express, { Router } from "express";
import dotenv from "dotenv";
import { notFoundHandler } from "../middlewares/notFoundHandler";
import { errorHandler } from "../middlewares/errorHandler";
import {
  getAllContacts,
  getContactsById,
} from "../controllers/contactController";
import cors from "cors";
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
const router = Router();
app.use("/", router);
app.get("/", (req, res) => {
  res.send("server is working");
});

router.get("/contacts", ctrlWrapper(getAllContacts));

router.get("/contacts/:id", ctrlWrapper(getContactsById));
router.post("/contacts", ctrlWrapper(createContact));
router.patch("/contacts/:id", ctrlWrapper(updatedContactController));
router.delete("/contacts/:id", ctrlWrapper(deletedContactController));
router.use("*", notFoundHandler);
router.use(errorHandler);
