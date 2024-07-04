import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model";
import generateToken from "../utils/generateToken";

export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { username, fullName, password } = req.body;
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password at least 6 characters");
    }
    const duplicate = await User.findOne({ username });
    if (duplicate) {
      res.status(400);
      throw new Error("User exists");
    }

    const newUser = new User({
      username,
      fullName,
      password,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        image: newUser.image,
        isAdmin: newUser.isAdmin,
        favourites: newUser.favourites,
      });
    } else {
      res.status(500);
      throw new Error("Internal Server Error");
    }
  }
);

export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404);
      throw new Error("Invalid username or password");
    }

    if (!(await user.comparePasswords(password))) {
      res.status(400);
      throw new Error("Invalid Credentials");
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      image: user.image,
      isAdmin: user.isAdmin,
      favourites: user.favourites,
    });
  }
);

export const logoutUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successful" });
  }
);

export const getMe = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req?.user._id).select("-password");
    if (!user) {
      res.status(500);
      throw new Error("Internal Server Error");
    }
    res.status(200).json(user);
  }
);
