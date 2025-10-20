import { Router } from "express";
import dotenv from "dotenv";
import {
  loginUserController,
  logoutController,
  registerController,
} from "../controllers/auth.js";
import { registerSchema, loginSchema } from "../validation/userSchemas.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../validation/validateUser.js";
import { authenticate } from "../middlewares/authenticate.js";
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



export default router;
