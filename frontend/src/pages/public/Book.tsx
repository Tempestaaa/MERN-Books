import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Book as BookType } from "../../types/book.type";
import { getBook } from "../../apis/book.api";
import { Heart, ShoppingCart } from "lucide-react";
import BookDetails from "../../components/book/BookDetails";
import OuterDetails from "../../components/book/OuterDetails";
import BookSkeleton from "../../components/book/BookSkeleton";

const Book = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<{ data: BookType }>({
    queryKey: ["book", { id }],
    queryFn: () => getBook(id as string),
  });
  const book = data?.data;

  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-8">
      {isLoading ? (
        <BookSkeleton />
      ) : (
        <>
          <section className="flex flex-col gap-4 sm:w-1/3">
            <div className="">
              <img
                src={book?.bookCover}
                alt="Book Cover"
                className="mx-auto rounded-md"
              />
            </div>
            <button className="btn btn-neutral flex items-center gap-1">
              <Heart /> <span>Favourites</span>
            </button>
            <button className="btn btn-outline flex items-center gap-1">
              <ShoppingCart /> <a href={book?.link}>Buy</a>
            </button>
          </section>

          <section className="flex flex-col gap-2 flex-1 max-h-[calc(100svh-80px)] overflow-y-auto pr-2">
            <article className="flex flex-col gap-2">
              {/* BOOK DETAILS */}
              <BookDetails book={book} />
              <div className="divider" />
              {/* OUTER DETAILS */}
              <OuterDetails book={book} />
              <div className="divider" />
            </article>
          </section>
        </>
      )}
    </div>
  );
};

export default Book;
