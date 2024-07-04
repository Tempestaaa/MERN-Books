import { User, UserLogin, UserRegister } from "../types/user.type";
import http from "../utils/http";

export const registerUser = (formData: UserRegister) =>
  http.post("api/auth/register", formData);

export const loginUser = (formData: UserLogin) =>
  http.post("api/auth/login", formData);

export const logoutUser = () => http.post("api/auth/logout");

export const authUser = async (): Promise<null | User> => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/me", {
      credentials: "include",
    });
    const data = await res.json();
    if (data.message) return null;
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
