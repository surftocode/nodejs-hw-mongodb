import express, { Router } from "express";
import dotenv from "dotenv";
import Contact from "../db/models/Contact.js";

import {
  createContact,
  deleteContactController,
  getAllContacts,
  getContactsById,
  updatedContactController,
} from "../controllers/contactController.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import mongoose from "mongoose";
dotenv.config();
export const router = Router();
router.get("/", (req, res) => {
  res.send("server is working");
});
router.get("/test-router", async (req, res, next) => {
  try {
    const data = await Contact.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
router.get("/debug", async (req, res) => {
  try {
    console.log("connected to db");

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "Allcollections",
      collections.map((col) => col.name)
    );
    const collectionNames = collections.map((col) => {
      col.name;
    });
    res.json({
      database: mongoose.connection.name,
      collections: collectionNames,
      connectionState:
        mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching collections",
      error: err.message,
    });
  }
});
router.get("/contacts", ctrlWrapper(getAllContacts));
router.get("/contacts/:id", ctrlWrapper(getContactsById));
router.post("/contacts", ctrlWrapper(createContact));
router.patch("/contacts/:id", ctrlWrapper(updatedContactController));
router.delete("/contacts/:id", ctrlWrapper(deleteContactController));

// export { router };
