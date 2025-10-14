import { Router } from "express";
import dotenv from "dotenv";
import {
  loginUserController,
  logoutController,
  registerController,
} from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { userSchema } from "../db/models/user.js";
import { validateBody } from "../validation/validateUser.js";
import { authenticate } from "../middlewares/authenticate.js";
dotenv.config();
const router = Router();

router.get("/", (req, res) => {
  res.send("auth router is working");
});

router.post("/register", 
validateBody(User), 
ctrlWrapper(registerController));

router.post("/login", 
ctrlWrapper(loginUserController));

router.post("/logout",
 authenticate,
 ctrlWrapper(logoutController));

export default router;
