import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface UserType {
  _id: string;
  username: string;
  fullName: string;
  password: string;
  image: string;
  isAdmin: boolean;
  favourites: string[];
}

export interface UserDocument extends UserType, Document {
  comparePasswords: (enteredPassword: string) => Promise<boolean>;
}

export const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, default: "https://picsum.photos/id/63/200/300" },
    isAdmin: { type: Boolean, default: false },
    favourites: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Book", default: [] },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePasswords = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
