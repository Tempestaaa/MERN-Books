import { useFormContext } from "react-hook-form";
import { BookAdd } from "../../types/book.type";

const BookCoverUpdateBook = () => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<BookAdd>();
  return (
    <label className="flex flex-col w-full space-y-2">
      <img
        src={getValues("bookCover") || ""}
        alt="Book Cover"
        className="md:w-1/2 lg:w-3/4 mx-auto h-[440px] rounded-md shadow-md"
      />
      <input
        type="file"
        accept="image/*"
        className={`${
          errors.bookCover && "border-error"
        } file-input file-input-bordered md:w-1/2 lg:w-3/4 mx-auto`}
        {...register("bookCover")}
      />
      {errors.bookCover && (
        <span className="text-xs text-error font-bold">
          {errors.bookCover.message as string}
        </span>
      )}
    </label>
  );
};

export default BookCoverUpdateBook;
