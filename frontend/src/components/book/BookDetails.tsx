import { Book } from "../../types/book.type";
import StarDisplay from "../StarDisplay";

type Props = {
  book: Book | undefined;
};

const BookDetails = ({ book }: Props) => {
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
        <StarDisplay rate={Number(book?.rating)} />
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
