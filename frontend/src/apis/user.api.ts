import http from "../utils/http";

export const getAllUsers = () => http.get("api/users/admin");

export const deleteUser = (id: string) => http.delete(`api/users/admin/${id}`);
