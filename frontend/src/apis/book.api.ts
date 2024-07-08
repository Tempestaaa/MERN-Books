import { BookAdd } from "../types/book.type";
import http from "../utils/http";

export const addBook = (formData: BookAdd) =>
  http.post("api/books/add", formData);

export const getAllBooks = () => http.get("api/books");

export const getBook = (id: string) => http.get(`api/books/one/${id}`);

export const updateBook = (formData: BookAdd, id: string) =>
  http.put(`api/books/update/${id}`, formData);

export const deleteBook = (id: string) => http.delete(`api/books/delete/${id}`);
