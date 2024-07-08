import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookBackEnd } from "../../types/book.type";
import { Link } from "react-router-dom";
import { Edit, Star, Trash } from "lucide-react";
import { deleteBook } from "../../apis/book.api";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading";

const BookList = () => {
  const queryClient = useQueryClient();
  const { data: books } = useQuery<{ data: BookBackEnd }>({
    queryKey: ["bookList"],
  });
  const { mutateAsync: deleteBookApi, isPending } = useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: async () => {
      toast.success("Book deleted");
      await queryClient.invalidateQueries({ queryKey: ["bookList"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      {books?.data.books.length === 0 ? (
        <p className="text-2xl font-bold">No book added yet!</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="table">
            <thead className="bg-neutral text-neutral-content">
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Original Title</th>
                <th>Author</th>
                <th>Language</th>
                <th>Format</th>
                <th>Publisher</th>
                <th>Published Date</th>
                <th>Rating</th>
                <th>Pages</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {books?.data.books.map((item) => (
                <tr key={item._id} className="hover duration-300">
                  {/* BOOK COVER */}
                  <th>
                    <Link
                      to={`/book/${item._id}`}
                      className="mask mask-squircle h-16 aspect-square"
                    >
                      <img src={item.bookCover} alt="Book Cover" />
                    </Link>
                  </th>

                  {/* TITLE */}
                  <td>
                    <Link
                      to={`/book/${item._id}`}
                      className="line-clamp-3 hover:underline duration-300"
                    >
                      {item.title}
                    </Link>
                  </td>

                  {/* ORIGINAL TITLE */}
                  <td>
                    <Link
                      to={`/book/${item._id}`}
                      className="line-clamp-3 hover:underline duration-300"
                    >
                      {item.originalTitle}
                    </Link>
                  </td>

                  {/* ORIGINAL TITLE */}
                  <td>
                    <span className="line-clamp-3">{item.author}</span>
                  </td>

                  {/* ORIGINAL TITLE */}
                  <td>
                    <span className="line-clamp-3">{item.language}</span>
                  </td>

                  {/* ORIGINAL TITLE */}
                  <td>
                    <span className="line-clamp-3">{item.format}</span>
                  </td>

                  {/* ORIGINAL TITLE */}
                  <td>
                    <span>{item.publisher}</span>
                  </td>

                  {/* ORIGINAL TITLE */}
                  <td>{new Date(item.published).toLocaleDateString()}</td>

                  {/* ORIGINAL TITLE */}
                  <td>
                    <span className="flex items-center gap-1">
                      {item.rating}
                      <Star
                        size={16}
                        fill="#facc15"
                        className="text-yellow-400"
                      />
                    </span>
                  </td>

                  {/* ORIGINAL TITLE */}
                  <td>{item.pages}</td>

                  {/* CONTROLLERS */}
                  <th>
                    <div className="flex gap-2">
                      <Link to={`update/${item._id}`}>
                        <Edit />
                      </Link>
                      <button
                        disabled={isPending}
                        onClick={async () => await deleteBookApi(item._id)}
                      >
                        {isPending ? <Loading /> : <Trash />}
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default BookList;
