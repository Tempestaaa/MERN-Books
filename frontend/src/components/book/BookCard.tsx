import { Link } from "react-router-dom";
import { Book } from "../../types/book.type";
import StarDisplay from "../StarDisplay";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavourites } from "../../apis/user.api";
import { toast } from "react-toastify";

type Props = {
  item: Book;
};

const BookCard = ({ item }: Props) => {
  const queryClient = useQueryClient();
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

  return (
    <div className="card shadow-xl image-full">
      <figure className="">
        <img src={item.bookCover} alt="Book Cover" />
      </figure>
      <div className="card-body text-xs">
        <Link to={`/book/${item._id}`} className="line-clamp-2 text-xs">
          {item.originalTitle}
        </Link>
        <Link to={`/book/${item._id}`} className="card-title line-clamp-2">
          {item.title}
        </Link>
        <span>{item.author}</span>
        <div className="flex items-center gap-2">
          <StarDisplay rate={item.rating} size={18} />
          <span>{item.rating}</span>
        </div>
        <span className="line-clamp-3">{item.desc}</span>
        <div className="flex flex-wrap gap-2">
          {item.genres.slice(0, 4).map((genre) => (
            <span key={genre._id} className="border-b-2 border-primary">
              {genre.name}
            </span>
          ))}
        </div>
        <span>{item.language}</span>
        <span>
          {item.pages} pages{item.format ? `, ${item.format}` : null}
        </span>
        <span>
          {new Date(item.published).toLocaleDateString()} by {item.publisher}
        </span>
        <p></p>

        <div className="card-actions justify-between items-center ">
          <button
            disabled={isPending}
            onClick={async () => await toggleFavouritesApi(item._id)}
          >
            <Heart fill="#ef4444" className="text-red-500" />
          </button>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            <button className="btn btn-primary">Buy Now</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
