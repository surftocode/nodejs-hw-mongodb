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
dotenv.config();
const router = Router();
router.get("/", (req, res) => {
  res.send("server is working");
});

router.get("/all", ctrlWrapper(getAllContacts));
router.get("/:id", ctrlWrapper(getContactsById));
router.post("/", ctrlWrapper(createContact));
router.patch("/:id", ctrlWrapper(updatedContactController));
router.delete("/:id", ctrlWrapper(deleteContactController));

export default router;
