import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Genre from "../models/genre.model";

export const addGenre = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("Name is required");
    }

    const duplicate = await Genre.findOne({ name });
    if (duplicate) {
      res.status(400);
      throw new Error("Genre exists");
    }

    const newGenre = new Genre({ name });
    await newGenre.save();
    res.status(201).json(newGenre);
  }
);

export const getAllGenres = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const allGenres = await Genre.find({
      ...(req.query._search && {
        $or: [{ name: { $regex: req.query._search, $options: "i" } }],
      }),
    }).sort({ name: 1 });
    res.status(200).json(allGenres);
  }
);

export const updateGenre = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("Name is required");
    }

    const genreExists = await Genre.findById(req.params.id);
    if (!genreExists) {
      res.status(404);
      throw new Error("Genre not found");
    }

    const duplicate = await Genre.findOne({ name });
    if (duplicate) {
      res.status(400);
      throw new Error("Genre exists");
    }

    genreExists.name = name;
    await genreExists.save();
    res.status(200).json({ message: "Genre updated" });
  }
);

export const deleteGenre = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      res.status(404);
      throw new Error("Genre not found");
    }

    await genre.deleteOne();
    res.status(200).json({ message: "Genre deleted" });
  }
);
