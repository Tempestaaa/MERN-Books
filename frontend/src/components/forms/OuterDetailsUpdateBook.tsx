import { useFormContext } from "react-hook-form";
import { BookAdd } from "../../types/book.type";
import Input from "../common/Input";

type Props = {
  isLoading: boolean;
};

const OuterDetailsUpdateBook = ({ isLoading }: Props) => {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<BookAdd>();
  const date = new Date(getValues("published") || Date.now());
  function formatDate(date: Date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  isLoading === false && setValue("published", formatDate(date));

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

export default OuterDetailsUpdateBook;
