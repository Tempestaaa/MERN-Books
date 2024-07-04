import { Router } from "express";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware";
import {
  addGenre,
  deleteGenre,
  getAllGenres,
  updateGenre,
} from "../controllers/genre.controller";
const router = Router();

router.post("/add", verifyToken, verifyAdmin, addGenre);
router.get("/all", getAllGenres);
router.put("/update/:id", verifyToken, verifyAdmin, updateGenre);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteGenre);
export default router;
