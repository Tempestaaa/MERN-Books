import { Router } from "express";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware";
import {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/book.controller";

const router = Router();

router.post("/add", verifyToken, verifyAdmin, addBook);
router.get("/", getAllBooks);
router.put("/update/:id", verifyToken, verifyAdmin, updateBook);
router.get("/one/:id", getBook);

export default router;
