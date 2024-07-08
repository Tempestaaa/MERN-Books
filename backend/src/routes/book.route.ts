import { Router } from "express";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/book.controller";

const router = Router();

router.post("/add", verifyToken, verifyAdmin, addBook);
router.get("/", getAllBooks);
router.get("/one/:id", getBook);
router.put("/update/:id", verifyToken, verifyAdmin, updateBook);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteBook);

export default router;
