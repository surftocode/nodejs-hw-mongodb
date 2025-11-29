import { Router } from "express";
import dotenv from "dotenv";
import {
  loginUserController,
  logoutController,
  registerController,
  requestResetEmailController,
} from "../controllers/auth.js";
import {
  registerSchema,
  loginSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from "../validation/userSchemas.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../validation/validateUser.js";
import { resetPasswordController } from "../controllers/auth.js";
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

router.post(
  "/requestPassword",
  (req, res, next) => {
    console.log("POST /request-reset-pwd router’a geldi. Body:", req.body);
    next();
  },
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController)
);

router.post(
  "/reset-pwd",
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController)
);

router.post("/requestPassword11", (req, res) => {
  res.json({
    message: "route is okay.",
  });
});

export default router;
