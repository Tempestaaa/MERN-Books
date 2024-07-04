import { FormProvider, useForm } from "react-hook-form";
import { BookAdd, BookDataAdd } from "../../types/book.type";
import { zodResolver } from "@hookform/resolvers/zod";
import BookDetails from "../../components/forms/BookDetails";
import GenreAdd from "../../components/forms/GenreAdd";
import OuterDetails from "../../components/forms/OuterDetails";
import BookCover from "../../components/forms/BookCover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBook } from "../../apis/book.api";
import Loading from "../../components/common/Loading";
import convertToBase64 from "../../utils/convertBase64";
import { toast } from "react-toastify";

const AddBook = () => {
  const queryClient = useQueryClient();
  const formMethods = useForm<BookAdd>({
    resolver: zodResolver(BookDataAdd),
  });
  const { handleSubmit, reset, setValue } = formMethods;

  const { mutateAsync: addBookApi, isPending } = useMutation({
    mutationFn: (formData: BookAdd) => addBook(formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bookList"] });
      toast.success("Book added");
      reset();
      setValue("genres", []);
    },
    onError: (error) => {
      toast.error(error.message);
      reset();
      setValue("genres", []);
    },
  });

  const onSubmit = async (data: BookAdd) => {
    const b64 = await convertToBase64(data.bookCover[0]);
    const bookData = { ...data, bookCover: b64 };
    addBookApi(bookData);
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col w-full">
        <h1 className="text-4xl font-bold uppercase tracking-wide">Add book</h1>

        <div className="divider"></div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex lg:gap-4 flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
              <BookDetails />
            </div>
            <div className="w-full lg:w-1/2 space-y-2">
              <GenreAdd />
              <OuterDetails />
              <BookCover />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="reset"
              className="btn btn-neutral mt-2"
              onClick={() => {
                reset();
                setValue("genres", []);
              }}
              disabled={isPending}
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="btn btn-neutral mt-2"
              disabled={isPending}
            >
              {isPending ? <Loading /> : "Add"}
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddBook;
