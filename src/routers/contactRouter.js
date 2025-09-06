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
const router = express.Router();
router
  .route("/")
  .get(ctrlWrapper(getAllContacts))
  .post(ctrlWrapper(createContact));
// router.get("/", ctrlWrapper(getAllContacts));
// router.get("/:id", ctrlWrapper(getContactsById));
// router.post("/", ctrlWrapper(createContact));
// router.patch("/:id", ctrlWrapper(updatedContactController));
// router.delete("/:id", ctrlWrapper(deleteContactController));
router
  .route("/:id")
  .get(ctrlWrapper(getContactsById))
  .patch(ctrlWrapper(updatedContactController))
  .delete(ctrlWrapper(deleteContactController));
export default router;
