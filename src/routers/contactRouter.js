import express, { Router } from "express";
import dotenv from "dotenv";
import { notFoundHandler } from "../middlewares/notFoundHandler.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import {
  getAllContacts,
  getContactsById,
} from "../controllers/contactController.js";
import validateBody, { isValidId, schema } from "../utils/validation.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
dotenv.config();
const app = express();
app.use(
  express.json({
    type: ["application/json", "application/vnd.api+json"],
  })
);
app.use(cors());
app.use(
  pino({
    transport: {
      target: "pino-pretty",
    },
  })
);
const router = Router();
app.get("/", (req, res) => {
  res.send("server is working");
});

router.get("/contacts", ctrlWrapper(getAllContacts));

router.get("/contacts/:id", isValidId, ctrlWrapper(getContactsById));
router.post("/contacts", validateBody, ctrlWrapper(createContact));
router.patch(
  "/contacts/:id",
  validateBody,
  isValidId,
  ctrlWrapper(updatedContactController)
);
router.delete("/contacts/:id", ctrlWrapper(deletedContactController));
router.use("*", notFoundHandler);
router.use(errorHandler);
export default router;
