import { Router } from "express";
import dotenv from "dotenv";
import {
  loginUserController,
  registerController,
} from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { userSchema } from "../db/models/user.js";
import { validateBody } from "../validation/validateUser.js";
import { loginUser } from "../services/auth.js";
dotenv.config();
const router = Router();
router.get("/auth", (req, res) => {
  res.send("auth router is working");
});

router.post(
  "/auth/register",
  validateBody(userSchema),
  ctrlWrapper(registerController)
);

router.post(
  "/auth/login",
  ctrlWrapper(loginUserController)
);

export default router;
