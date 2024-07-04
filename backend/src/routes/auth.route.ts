import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", verifyToken, getMe);

export default router;
