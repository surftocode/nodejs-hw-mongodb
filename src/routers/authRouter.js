import { Router } from "express";
import dotenv from "dotenv";
import {
  loginUserController,
  registerController,
} from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { userSchema } from "../db/models/user.js";
import { validateBody } from "../validation/validateUser.js";

dotenv.config();
const router = Router();


router.get("/", (req, res) => {
  res.send("auth router is working");

});

router.post(
  "/register",
  validateBody(userSchema),
  ctrlWrapper(registerController)
);

router.post("/login", 
ctrlWrapper(loginUserController));

export default router;
