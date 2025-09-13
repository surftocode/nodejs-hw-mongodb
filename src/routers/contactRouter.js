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
import validateBody from "../middlewares/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../validator/validation.js";
const app = express();
const router = Router();
app.get("/", (req, res) => {
  res.send("server is working");
});

router.get("/contacts", ctrlWrapper(getAllContacts));

// router.get("/contacts/:id", ctrlWrapper(getContactsById));
router.post("/",
  validateBody(createContactSchema),
  ctrlWrapper(createContact)
);
// router.patch(
//   ":id",
//   validateBody(updateContactSchema),
//   ctrlWrapper(updatedContactController)
// );
router.route("/:id")
.get(ctrlWrapper(getContactsById))
.patch(validateBody(updateContactSchema), ctrlWrapper(updatedContactController))
.delete(ctrlWrapper(deleteContactController));
router.delete("/contacts/:id", ctrlWrapper(deleteContactController));

export default router;
