import http from "../utils/http";

export const getAllGenres = () => http.get("api/genres/all");
