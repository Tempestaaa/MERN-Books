import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/error.middleware";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import authRoutes from "./routes/auth.route";
import genreRoutes from "./routes/genre.route";
import bookRoutes from "./routes/book.route";
import userRoutes from "./routes/user.route";

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// CONNECT DATABASE
mongoose
  .connect(process.env.DATABASE_STRING as string)
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => console.log(e));

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json({ limit: "2MB" }));
app.use(cookieParser());
const port = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
