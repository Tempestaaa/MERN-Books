import { useQuery } from "@tanstack/react-query";
import { Gerne } from "../../types/genre.type";
import { Controller, useFormContext } from "react-hook-form";
import { BookAdd } from "../../types/book.type";
import Select from "react-select";

const GenreAdd = () => {
  const { data: genres } = useQuery<{ data: Gerne[] }>({
    queryKey: ["genreList"],
  });
  const { control } = useFormContext<BookAdd>();

  return (
    <Controller
      control={control}
      name="genres"
      render={({ field, formState: { errors } }) => (
        <label>
          Genres
          <Select
            {...field}
            isClearable
            isMulti
            options={genres?.data}
            getOptionLabel={(option) => option["name"]}
            getOptionValue={(option) => option["_id"]}
            className={`border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] rounded-lg bg-[var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))] ${
              errors.genres && "!border-error"
            }`}
            styles={{
              control: () => ({
                minHeight: "3rem",
                display: "flex",
              }),
              menu: () => ({
                background:
                  "var(--fallback-b1, oklch(var(--b1) / var(--tw-bg-opacity)))]",
              }),
            }}
          />
          {errors.genres && (
            <span className="text-xs text-error font-bold">
              {errors.genres.message}
            </span>
          )}
        </label>
      )}
    />
  );
};

export default GenreAdd;
