import { useFormContext } from "react-hook-form";
import { BookAdd } from "../../types/book.type";

const BookCover = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookAdd>();
  return (
    <label className="flex flex-col w-full">
      Book Cover
      <input
        type="file"
        accept="image/*"
        className={`${
          errors.bookCover && "border-error"
        } file-input file-input-bordered`}
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

export default BookCover;
