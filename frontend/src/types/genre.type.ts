import { z } from "zod";

// GENRE
export const GenreData = z.object({
  _id: z.string(),
  name: z.string().trim().min(1, { message: "Required" }),
});
export type Gerne = z.infer<typeof GenreData>;

// GENRE ADD
export const GenreDataAdd = GenreData.pick({ name: true });
export type GenreAdd = z.infer<typeof GenreDataAdd>;
