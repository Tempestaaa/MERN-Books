import mongoose from "mongoose";
import { GenreType } from "./genre.model";

export interface BookType {
  _id: string;
  title: string;
  originalTitle: string;
  series: string;
  author: string;
  desc: string;
  genres: GenreType[];
  bookCover: string;
  language: string;
  format: string;
  publisher: string;
  pages: number;
  rating: number;
  published: string;
  link: string;
}

const bookSchema = new mongoose.Schema<BookType>(
  {
    title: { type: String, required: true, unique: true },
    originalTitle: { type: String, required: true },
    author: { type: String, required: true },
    desc: { type: String, required: true },
    genres: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true },
    ],
    bookCover: { type: String, required: true },
    language: { type: String, required: true },
    series: { type: String },
    link: { type: String },
    format: { type: String },
    publisher: { type: String, required: true },
    pages: { type: Number, required: true, min: 0 },
    rating: { type: Number, required: true },
    published: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
