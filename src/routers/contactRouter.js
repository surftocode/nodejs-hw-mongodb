import express from "express";
import {
  getAllContacts,
  getContactsById,
} from "../controllers/contactController.js";

const router = express.Router();
router.get("/contacts",getAllContacts);
router.get("/contacts/:contactId",getContactsById);

