import { Star } from "lucide-react";
import { Book } from "../../types/book.type";

type Props = {
  book: Book | undefined;
};

const BookDetails = ({ book }: Props) => {
  const rating = (rate: number) => {
    const star = Math.floor(rate) || 5;
    return (
      <div className="flex gap-1">
        {[...Array(star)].map((_, i) => (
          <Star key={i} size={32} fill="#facc15" className="text-yellow-400" />
        ))}
        {[...Array(5 - star)].map((_, i) => (
          <Star
            key={i}
            size={32}
            fill="#d3cecf"
            className="text-neutral-content"
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/*   ORIGINAL TITLE */}
      <h2 className="text-2xl">{book?.originalTitle}</h2>

      {/* TITLE */}
      <h1 className="text-4xl font-bold line-clamp-3">{book?.title}</h1>

      {/* AUTHOR */}
      <h3 className="text-xl">{book?.author}</h3>

      {/* RATING */}
      <div className="flex gap-2 items-center">
        {rating(Number(book?.rating))}
        <span className="text-lg font-semibold">{book?.rating}</span>
      </div>

      {/* DESCRIPTION */}
      <p className="line-clamp-4 text-sm">{book?.desc}</p>

      {/* GENRES */}
      <div className="flex gap-2">
        <span>Genres:</span>
        <div className="flex flex-wrap gap-4">
          {book?.genres.map((item) => (
            <div key={item._id} className="border-b-2 border-primary">
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookDetails;
