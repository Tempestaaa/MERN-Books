import mongoose from "mongoose";

export interface GenreType {
  _id: string;
  name: string;
}

const genreSchema = new mongoose.Schema<GenreType>({
  name: { type: String, required: true, unique: true },
});

const Genre = mongoose.model("Genre", genreSchema);
export default Genre;
