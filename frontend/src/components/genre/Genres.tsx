import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Gerne } from "../../types/genre.type";
import { deleteGenre } from "../../apis/genre.api";

type Props = {
  genreList: Gerne[] | undefined;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

const Genres = ({ genreList, setId, setName }: Props) => {
  const queryClient = useQueryClient();

  // DELETE GENRE
  const { mutateAsync: deleteGenreApi } = useMutation({
    mutationFn: (genreId: string) => deleteGenre(genreId),
    onSuccess: async () => {
      toast.success("Genre deleted");
      await queryClient.invalidateQueries({ queryKey: ["genreList"] });
      setId(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      {genreList?.map((item) => (
        <div
          key={item._id}
          className="btn btn-outline duration-300 flex items-center justify-between"
        >
          <span
            onClick={() => {
              setId(item._id);
              setName(item.name);
            }}
            className="flex-1 h-full grid place-items-center truncate font-normal"
          >
            {item.name}
          </span>
          <button onClick={async () => await deleteGenreApi(item._id)}>
            <X />
          </button>
        </div>
      ))}
    </>
  );
};

export default Genres;
