import { Router } from "express";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware";
import { deleteUser, getAllUsers } from "../controllers/user.controller";

const router = Router();

// ADMIN
router.get("/admin", verifyToken, verifyAdmin, getAllUsers);
router.delete("/admin/:id", verifyToken, verifyAdmin, deleteUser);

export default router;
