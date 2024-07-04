import { z } from "zod";
import { GenreData } from "./genre.type";

// BOOK
export const BookData = z.object({
  _id: z.string(),
  title: z.string().trim().min(1, { message: "Required" }),
  originalTitle: z.string().trim().min(1, { message: "Required" }),
  author: z.string().trim().min(1, { message: "Required" }),
  desc: z.string().trim().min(1, { message: "Required" }),
  language: z.string().trim().min(1, { message: "Required" }),
  publisher: z.string().trim().min(1, { message: "Required" }),
  link: z.string().trim().optional(),
  format: z.string().trim().optional(),
  series: z.string().trim().optional(),
  bookCover: z
    .any()
    .refine((data) => data.length !== 0, { message: "Required" }),
  genres: z.array(GenreData).min(1, { message: "Required" }),
  pages: z.coerce.number().int().positive(),
  rating: z.coerce.number().positive().min(1).max(5),
  published: z.coerce
    .date()
    .refine((date) => date < new Date(), {
      message: "Date can't be in the future",
    })
    .or(z.string()),
});
export type Book = z.infer<typeof BookData>;

// BOOK ADD
export const BookDataAdd = BookData.omit({
  _id: true,
});
export type BookAdd = z.infer<typeof BookDataAdd>;

// BOOK BACKEND
export const BookDataBackEnd = z.object({
  books: z.array(BookData),
  page: z.coerce.number(),
  pages: z.coerce.number(),
  total: z.coerce.number(),
});
export type BookBackEnd = z.infer<typeof BookDataBackEnd>;
