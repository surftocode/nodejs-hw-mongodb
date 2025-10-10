import express, { Router } from "express";
import dotenv from "dotenv";
import { notFoundHandler } from "../middlewares/notFoundHandler.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import {
  createContact,
  deleteContactController,
  getAllContacts,
  getContactsById,
  updatedContactController,
} from "../controllers/contactController.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
dotenv.config();
const router = Router();
router.get("/", (req, res) => {
  res.send("server is working");
});

router.get("/contacts", ctrlWrapper(getAllContacts));

router.get("/contacts/:id", ctrlWrapper(getContactsById));
router.post("/contacts", ctrlWrapper(createContact));
router.patch("/contacts/:id", ctrlWrapper(updatedContactController));
router.delete("/contacts/:id", ctrlWrapper(deleteContactController));


export { router };
