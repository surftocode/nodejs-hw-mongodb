import { Router } from "express";
import dotenv from "dotenv";
import {
  loginUserController,
  logoutController,
  registerController,
  requestResetEmailController,
} from "../controllers/auth.js";
import { registerSchema, loginSchema, requestResetEmailSchema, resetPasswordSchema } from "../validation/userSchemas.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../validation/validateUser.js";
import { authenticate } from "../middlewares/authenticate.js";
import { resetPasswordController } from "../controllers/contactController.js";
dotenv.config();
const router = Router();

router.get("/", (req, res) => {
  res.send("auth router is working");
});

router.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(registerController)
);


router.post(
  "/login",
  validateBody(loginSchema),
  ctrlWrapper(loginUserController)
);

router.post("/logout", ctrlWrapper(logoutController));
router.post("/send-reset-email",validateBody(requestResetEmailSchema),ctrlWrapper(requestResetEmailController))
router.post("/reset-password",validateBody(resetPasswordSchema),ctrlWrapper(resetPasswordController))


export default router;
