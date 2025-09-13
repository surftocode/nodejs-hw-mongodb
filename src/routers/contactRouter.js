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
import { Router } from "express";
const router = Router();


router.get("/", ctrlWrapper(getAllContacts));

// router.get("/contacts/:id", ctrlWrapper(getContactsById));
router.post("/", validateBody(createContactSchema), ctrlWrapper(createContact));
// router.patch(
//   ":id",
//   validateBody(updateContactSchema),
//   ctrlWrapper(updatedContactController)
// );
router
  .route("/:id")
  .get(ctrlWrapper(getContactsById))
  .patch(
    validateBody(updateContactSchema),
    ctrlWrapper(updatedContactController)
  )
  .delete(ctrlWrapper(deleteContactController));
router.delete("/:id", ctrlWrapper(deleteContactController));

export default router;
