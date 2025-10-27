import { Router } from "express";
import dotenv from "dotenv";
import {
  createContact,
  deleteContactController,
  getAllContacts,
  getContactsById,
  updatedContactController,
} from "../controllers/contactController.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticate } from "../middlewares/authenticate.js";
import Contact from "../db/models/Contact.js";

dotenv.config();
const router = Router();
// router.get("/", (req, res) => {
//   res.send("server is working");
// });
router.get("/debug", async (req, res) => {
  try {
    const countContact = await Contact.countDocuments();
    res.json({
      status: "OK",
      database: "Connected",
      userCount: countContact,
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    es.status(500).json({
      status: "ERROR",
      database: "Disconnected",
      environment: process.env.NODE_ENV,
      message: error.message,
    });
  }
});
router.get("/", ctrlWrapper(getAllContacts));
router.get("/:id", ctrlWrapper(getContactsById));
router.post("/", ctrlWrapper(createContact));
router.patch("/:id", ctrlWrapper(updatedContactController));
router.delete("/:id", ctrlWrapper(deleteContactController));

export default router;
