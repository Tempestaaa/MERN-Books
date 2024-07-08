import { z } from "zod";
import { BookData } from "./book.type";

// USER
export const UserData = z.object({
  _id: z.string(),
  username: z.string().trim().min(1, { message: "Required" }),
  fullName: z.string().trim().min(1, { message: "Required" }),
  password: z.string().trim().min(6, { message: "6 Minimum" }),
  image: z.any(),
  favourites: z.array(z.string()),
  isAdmin: z.coerce.boolean(),
});
export type User = z.infer<typeof UserData>;

// USER REGISTER
export const UserDataRegister = UserData.pick({
  username: true,
  password: true,
  fullName: true,
})
  .extend({ confirm: z.string().trim().min(6, { message: "6 Minimum" }) })
  .refine((data) => data.password === data.confirm, {
    message: "Password do not match",
    path: ["confirm"],
  });
export type UserRegister = z.infer<typeof UserDataRegister>;

// USER LOGIN
export const UserDataLogin = UserData.pick({ username: true, password: true });
export type UserLogin = z.infer<typeof UserDataLogin>;

// USER BACKEND
export const UserDataBackEnd = z.object({
  users: z.array(UserData),
  page: z.coerce.number(),
  pages: z.coerce.number(),
  total: z.coerce.number(),
});
export type UserBackEnd = z.infer<typeof UserDataBackEnd>;

// USER PROFILE UPDATE
export const UserDataUpdateProfile = UserData.pick({
  username: true,
  fullName: true,
  image: true,
});
export type UserUpdateProfile = z.infer<typeof UserDataUpdateProfile>;

// USER PASSWORD UPDATE
export const UserDataUpdatePassword = z
  .object({
    oldPassword: z.string().trim().min(6, { message: "6 Minimum" }),
    confirm: z.string().trim().min(6, { message: "6 Minimum" }),
    newPassword: z.string().trim().min(6, { message: "6 Minimum" }),
  })
  .refine((data) => data.newPassword === data.confirm, {
    message: "Password do not match",
    path: ["confirm"],
  });
export type UserUpdatePassword = z.infer<typeof UserDataUpdatePassword>;
