import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { UserType } from "../models/user.model";
import expressAsyncHandler from "express-async-handler";

declare global {
  namespace Express {
    interface Request {
      user: UserType;
    }
  }
}

export const verifyToken = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    if (!decoded) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }

    const user = await User.findById((decoded as JwtPayload).userId).select(
      "-password"
    );
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    req.user = user;
    next();
  }
);

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.isAdmin) next();
  else {
    res.status(401);
    throw new Error("Not an admin");
  }
};
