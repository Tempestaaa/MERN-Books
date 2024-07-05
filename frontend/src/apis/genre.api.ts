import { GenreAdd, Gerne } from "../types/genre.type";
import http from "../utils/http";

export const getAllGenres = () => http.get("api/genres/all");

export const addGenre = (formData: GenreAdd) =>
  http.post("api/genres/add", formData);

export const updateGenre = (formData: Gerne, id: string) =>
  http.put(`api/genres/update/${id}`, formData);

export const deleteGenre = (id: string) =>
  http.delete(`api/genres/delete/${id}`);
