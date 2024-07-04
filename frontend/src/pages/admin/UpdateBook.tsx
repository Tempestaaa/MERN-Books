import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Book, BookAdd, BookDataAdd } from "../../types/book.type";
import BookDetails from "../../components/forms/BookDetails";
import GenreAdd from "../../components/forms/GenreAdd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBook, updateBook } from "../../apis/book.api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";
import { toast } from "react-toastify";
import OuterDetailsUpdateBook from "../../components/forms/OuterDetailsUpdateBook";
import BookCoverUpdateBook from "../../components/forms/BookCoverUpdateBook";
import convertToBase64 from "../../utils/convertBase64";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: book, isLoading } = useQuery<{ data: Book }>({
    queryKey: ["book", { id }],
    queryFn: () => getBook(id as string),
  });

  const formMethods = useForm<BookAdd>({
    resolver: zodResolver(BookDataAdd),
    values: book?.data,
  });
  const { handleSubmit, reset, setValue } = formMethods;

  const { mutateAsync: updateBookApi, isPending } = useMutation({
    mutationFn: (formData: BookAdd) => updateBook(formData, id as string),
    onSuccess: async () => {
      toast.success("Book updated");
      await queryClient.invalidateQueries({ queryKey: ["bookList"] });
      await queryClient.invalidateQueries({ queryKey: ["book", { id }] });
      navigate("/dashboard/books");
    },
    onError: (error) => {
      toast.error(error.message);
      reset();
      setValue("genres", []);
    },
  });

  const onSubmit = async (data: BookAdd) => {
    if (data.bookCover && typeof data.bookCover !== "string") {
      const b64 = await convertToBase64(data.bookCover[0]);
      const bookData = { ...data, bookCover: b64 };
      updateBookApi(bookData);
    } else {
      updateBookApi(data);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full grid place-items-center">
          <Loading />
        </div>
      ) : (
        <FormProvider {...formMethods}>
          <div className="flex flex-col w-full">
            <h1 className="text-4xl font-bold uppercase tracking-wide line-clamp-1">
              Update <span className="text-secondary">${book?.data.title}</span>
            </h1>

            <div className="divider"></div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex lg:gap-4 flex-col lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <BookCoverUpdateBook />
                  <BookDetails />
                  <GenreAdd />
                  <OuterDetailsUpdateBook isLoading={isLoading} />
                </div>
              </div>

              <div className="mt-2 flex ">
                <button
                  type="submit"
                  className="btn btn-neutral justify-self-end"
                  disabled={isPending}
                >
                  {isPending ? <Loading /> : "Update"}
                </button>
              </div>
            </form>
          </div>
        </FormProvider>
      )}
    </>
  );
};

export default UpdateBook;
