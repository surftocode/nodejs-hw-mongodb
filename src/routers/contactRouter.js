import express, { Router } from "express";
import dotenv from "dotenv";

import {
  createContact,
  deleteContactController,
  getAllContacts,
  getContactsById,
  updatedContactController,
} from "../controllers/contactController.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
dotenv.config();
export const router = Router();
router.get("/", (req, res) => {
  res.send("server is working");
});
router.get("/test-router",(req,res)=>{res.send("router çalıştı")});
router.get("/contacts", ctrlWrapper(getAllContacts));
router.get("/contacts/:id", ctrlWrapper(getContactsById));
router.post("/contacts", ctrlWrapper(createContact));
router.patch("/contacts/:id", ctrlWrapper(updatedContactController));
router.delete("/contacts/:id", ctrlWrapper(deleteContactController));

// export { router };
