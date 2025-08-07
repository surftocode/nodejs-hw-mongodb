import express from "express";
import { contact } from "../db/models/Contact.js";

const router = express.Router();
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await contact.find("../db/models/Contact.js");
    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed fetch content",
      error: err.message,
    });
  }
});
