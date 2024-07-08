import { UserUpdatePassword, UserUpdateProfile } from "../types/user.type";
import http from "../utils/http";

export const getAllUsers = () => http.get("api/users/admin");

export const deleteUser = (id: string) => http.delete(`api/users/admin/${id}`);

export const updateProfile = (formData: UserUpdateProfile) =>
  http.put("api/users/profile", formData);

export const updatePassword = (formData: UserUpdatePassword) =>
  http.put("api/users/password", formData);

export const toggleFavourites = (bookId: string) =>
  http.post("api/users/favourites", JSON.stringify({ bookId }));

export const getAllFavourites = () => http.get("api/users/favourites");

export const deleteAllFavourites = () => http.delete("api/users/favourites");
