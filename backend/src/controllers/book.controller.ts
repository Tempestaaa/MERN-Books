import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Book from "../models/book.model";
import { v2 as cloudinary } from "cloudinary";

export const addBook = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { title } = req.body;
    let { bookCover } = req.body;
    const duplicate = await Book.findOne({ title });
    if (duplicate) {
      res.status(400);
      throw new Error("Book exists");
    }

    const uploadRes = await cloudinary.uploader.upload(bookCover);
    bookCover = uploadRes.url;

    const newBook = new Book({ ...req.body, bookCover });

    if (newBook) {
      await newBook.save();
      res.status(201).json(newBook);
    } else {
      res.status(500);
      throw new Error("Internal Server Error");
    }
  }
);

export const getAllBooks = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query._page) || 1;
    const limit = Number(req.query._limit) || 12;
    const skip = (page - 1) * limit;

    const allBooks = await Book.find({
      ...(req.query._search && {
        $or: [
          { title: { $regex: req.query._search, $options: "i" } },
          { originalTitle: { $regex: req.query._search, $options: "i" } },
        ],
      }),
    })
      .populate("genres")
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments();

    res.status(200).json({
      books: allBooks,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  }
);

export const updateBook = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const {
      title,
      originalTitle,
      series,
      link,
      desc,
      genres,
      author,
      language,
      format,
      publisher,
      pages,
      rating,
      published,
    } = req.body;
    let { bookCover } = req.body;

    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404);
      throw new Error("Book not found");
    }

    // DELETE AND UPDATE BOOK COVER
    if ((bookCover === book?.bookCover) === false) {
      if (book?.bookCover) {
        await cloudinary.uploader.destroy(
          book?.bookCover.split("/").pop()?.split(".")[0] as string
        );
      }

      const uploadRes = await cloudinary.uploader.upload(bookCover);
      bookCover = uploadRes.url;
    }

    book.title = title || book.title;
    book.originalTitle = originalTitle || book.originalTitle;
    book.desc = desc || book.desc;
    book.link = link || book.link;
    book.author = author || book.author;
    book.genres = genres || book.genres;
    book.series = series || book.series;
    book.language = language || book.language;
    book.format = format || book.format;
    book.pages = pages || book.pages;
    book.rating = rating || book.rating;
    book.publisher = publisher || book.publisher;
    book.published = published || book.published;
    book.bookCover = bookCover || book.bookCover;

    await book.save();
    res.status(200).json({ message: "Book updated" });
  }
);

export const getBook = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const book = await Book.findById(req.params.id).populate("genres");
    if (!book) {
      res.status(404);
      throw new Error("Book not found");
    }

    res.status(200).json(book);
  }
);
