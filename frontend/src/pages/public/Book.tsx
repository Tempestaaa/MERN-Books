import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Book as BookType } from "../../types/book.type";
import { getBook } from "../../apis/book.api";
import { Heart, ShoppingCart } from "lucide-react";
import BookDetails from "../../components/book/BookDetails";
import OuterDetails from "../../components/book/OuterDetails";
import BookSkeleton from "../../components/book/BookSkeleton";
import { toggleFavourites } from "../../apis/user.api";
import { toast } from "react-toastify";
import { User } from "../../types/user.type";

const Book = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { data, isLoading } = useQuery<{ data: BookType }>({
    queryKey: ["book", { id }],
    queryFn: () => getBook(id as string),
  });
  const book = data?.data;

  const { mutateAsync: toggleFavouritesApi, isPending } = useMutation({
    mutationKey: ["toggleFavourites"],
    mutationFn: (bookId: string) => toggleFavourites(bookId),
    onSuccess: async () => {
      toast.success("Book added to favourites");
      await queryClient.invalidateQueries({ queryKey: ["favourites"] });
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });
  const isAlreadyInFavourites = user?.favourites.includes(id as string);

  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-8">
      {isLoading ? (
        <BookSkeleton />
      ) : (
        <div className="flex flex-col">
          {/* BREADCRUMB */}

          <div className="flex flex-col sm:flex-row gap-4">
            <section className="flex flex-col gap-4 sm:w-1/3">
              <div className="">
                <img
                  src={book?.bookCover}
                  alt="Book Cover"
                  className="mx-auto rounded-md w-3/4 max-h-[600px]"
                />
              </div>
              <button
                disabled={isPending}
                onClick={async () => await toggleFavouritesApi(id as string)}
                className="btn btn-neutral flex items-center gap-1 w-3/4 mx-auto"
              >
                {isAlreadyInFavourites ? (
                  <>
                    <Heart fill="#ef4444" className="text-red-500" />{" "}
                    <span>Already In Favourites</span>
                  </>
                ) : (
                  <>
                    <Heart /> <span>Favourites</span>
                  </>
                )}
              </button>
              <button className="btn btn-outline flex items-center gap-1 w-3/4 mx-auto">
                <ShoppingCart />{" "}
                <a href={book?.link} target="_blank" rel="noopener noreferrer">
                  Buy now
                </a>
              </button>
            </section>

            <section className="flex flex-col gap-2 flex-1 max-h-[calc(100svh-80px)] overflow-y-auto sm:pr-2">
              <article className="flex flex-col gap-2">
                {/* BOOK DETAILS */}
                <BookDetails book={book} />
                <div className="divider" />
                {/* OUTER DETAILS */}
                <OuterDetails book={book} />
                <div className="divider" />
              </article>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
