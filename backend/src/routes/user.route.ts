import { Router } from "express";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware";
import {
  deleteAllFavourites,
  deleteUser,
  getAllFavourites,
  getAllUsers,
  toggleFavorites,
  updatePassword,
  updateProfile,
} from "../controllers/user.controller";

const router = Router();

// ADMIN
router.get("/admin", verifyToken, verifyAdmin, getAllUsers);
router.delete("/admin/:id", verifyToken, verifyAdmin, deleteUser);

// USER
router.put("/profile", verifyToken, updateProfile);
router.put("/password", verifyToken, updatePassword);

// USER - FAVOURITES
router
  .route("/favourites")
  .get(verifyToken, getAllFavourites)
  .post(verifyToken, toggleFavorites)
  .delete(verifyToken, deleteAllFavourites);

export default router;
