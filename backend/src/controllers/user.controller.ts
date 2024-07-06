import { Response, Request } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model";

export const getAllUsers = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const total = await User.countDocuments();
    const page = Number(req.query._page) || 1;
    const limit = Number(req.query._limit) || 10;
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
