import { useFormContext } from "react-hook-form";
import { BookAdd } from "../../types/book.type";
import Input from "../common/Input";

const OuterDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookAdd>();
  return (
    <section className="flex flex-col gap-2 w-full">
      <Input
        label="Language"
        {...register("language")}
        error={errors.language}
      />
      <Input label="Format" {...register("format")} error={errors.format} />
      <Input
        label="Publisher"
        {...register("publisher")}
        error={errors.publisher}
      />
      <Input label="Link buy book" {...register("link")} error={errors.link} />
      <Input
        type="number"
        label="Pages"
        {...register("pages")}
        error={errors.pages}
      />
      <Input
        type="number"
        step="any"
        label="Rating"
        {...register("rating")}
        error={errors.rating}
      />
      <Input
        type="date"
        label="Published date"
        {...register("published")}
        error={errors.published}
      />
    </section>
  );
};

export default OuterDetails;
