import { Response, Request } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model";
import { v2 as cloudinary } from "cloudinary";

export const getAllUsers = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const total = await User.countDocuments();
    const page = Number(req.query._page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find({
      ...(req.query._search && {
        $or: [{ username: { $regex: req.query._search, $options: "i" } }],
      }),
    })
      .select("-password")
      .populate("favourites")
      .sort({ username: 1 })
      .limit(limit)
      .skip(skip);

    res.status(200).json({
      users,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  }
);

export const deleteUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can't delete admin user");
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted" });
  }
);

export const updateProfile = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const { username, fullName } = req.body;
    let { image } = req.body;

    if ((image === user?.image) === false) {
      if (user?.image) {
        await cloudinary.uploader.destroy(
          user?.image.split("/").pop()?.split(".")[0] as string
        );
      }

      const uploadRes = await cloudinary.uploader.upload(image);
      image = uploadRes.url;
    }

    user.username = username || user.username;
    user.fullName = fullName || user.fullName;
    user.image = image || user.image;

    await user.save();
    res.status(200).json({ message: "Profile updated" });
  }
);

export const updatePassword = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (!(await user.comparePasswords(oldPassword))) {
      res.status(400);
      throw new Error("Wrong password");
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password updated" });
  }
);

export const getAllFavourites = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate({
        path: "favourites",
        populate: { path: "genres" },
      });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json(user.favourites);
  }
);

export const toggleFavorites = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { bookId } = req.body;
    if (!bookId) {
      res.status(404);
      throw new Error("Book id is not provided");
    }
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const favouritedBook = user.favourites.includes(bookId);
    if (favouritedBook) {
      await User.updateOne(
        { _id: req.user._id },
        { $pull: { favourites: bookId } }
      );
      res.status(200).json({ message: "Book removed" });
    } else {
      user.favourites.push(bookId);
      await user.save();
      res.status(200).json({ message: "Book added" });
    }
  }
);

export const deleteAllFavourites = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.favourites = [];
    await user.save();
    res.status(200).json({ message: "All books removed" });
  }
);
