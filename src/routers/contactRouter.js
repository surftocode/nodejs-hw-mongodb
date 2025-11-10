import { Router } from "express";
import dotenv from "dotenv";
import {
  createContact,
  deleteContactController,
  getAllContacts,
  getContactsById,
  updateContactPhotoController,
  updatedContactController,
} from "../controllers/contactController.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import Contact from "../db/models/Contact.js";
import { authenticate } from "../middlewares/authenticate.js";
import upload from "../middlewares/multer.js";
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
    res.status(500).json({
      status: "ERROR",
      database: "Disconnected",
      environment: process.env.NODE_ENV,
      message: error.message,
    });
  }
});
router.get("/", authenticate, ctrlWrapper(getAllContacts));
router.get("/:id", authenticate, ctrlWrapper(getContactsById));
router.post("/", authenticate, ctrlWrapper(createContact));
router.patch("/:id", authenticate, ctrlWrapper(updatedContactController));
router.patch("/:id/photo",authenticate,upload.single("photo"), ctrlWrapper(updateContactPhotoController));
router.delete("/:id", authenticate, ctrlWrapper(deleteContactController));

export default router;
