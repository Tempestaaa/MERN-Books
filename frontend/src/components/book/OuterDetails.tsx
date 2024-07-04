import { Book } from "../../types/book.type";

type Props = {
  book: Book | undefined;
};

const OuterDetails = ({ book }: Props) => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-8">
      <div className="flex flex-col font-semibold">
        <span>Series</span>
        <span>Pages</span>
        <span>Format</span>
        <span>Language</span>
        <span>Published date</span>
      </div>
      <div className="flex flex-col">
        <span>{book?.series}</span>
        <span>{book?.pages} pages</span>
        <span>{book?.format}</span>
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
