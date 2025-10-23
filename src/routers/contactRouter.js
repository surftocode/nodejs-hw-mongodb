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

dotenv.config();
const router = Router();
// router.get("/", (req, res) => {
//   res.send("server is working");
// });

router.get("/", ctrlWrapper(getAllContacts));
router.get("/:id", authenticate, ctrlWrapper(getContactsById));
router.post("/", authenticate, ctrlWrapper(createContact));
router.patch("/:id", authenticate, ctrlWrapper(updatedContactController));
router.delete("/:id", authenticate, ctrlWrapper(deleteContactController));

export default router;
