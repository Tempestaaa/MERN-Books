import { Book } from "../../types/book.type";

type Props = {
  book: Book | undefined;
};

const OuterDetails = ({ book }: Props) => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-8 text-sm">
      <div className="flex flex-col font-semibold">
        <span>{book?.series ? "Series" : ""}</span>
        <span>Pages</span>
        <span>Language</span>
        <span>Published date</span>
      </div>
      <div className="flex flex-col whitespace-nowrap">
        <span>{book?.series}</span>
        <span>
          {book?.pages} pages{book?.format ? `, ${book.format}` : ""}
        </span>
        <span>{book?.language}</span>
        <span>
          {new Date(book?.published as string).toLocaleDateString()} by{" "}
          {book?.publisher}
        </span>
      </div>
    </div>
  );
};

export default OuterDetails;
