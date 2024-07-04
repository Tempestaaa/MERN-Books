import { useFormContext } from "react-hook-form";
import { BookAdd } from "../../types/book.type";
import Input from "../common/Input";
import Textarea from "../common/Textarea";

const BookDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookAdd>();
  return (
    <section className="flex flex-col gap-2 w-full">
      <Input label="Title" {...register("title")} error={errors.title} />
      <Input
        label="Original Title"
        {...register("originalTitle")}
        error={errors.originalTitle}
      />
      <Input label="Author" {...register("author")} error={errors.author} />
      <Input label="Series" {...register("series")} error={errors.series} />
      <Textarea
        label="Description"
        rows={13}
        {...register("desc")}
        error={errors.desc}
      />
    </section>
  );
};

export default BookDetails;
