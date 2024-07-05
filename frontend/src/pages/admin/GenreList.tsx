import Input from "../../components/common/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GenreAdd, Gerne } from "../../types/genre.type";
import { useState } from "react";
import Genres from "../../components/Genres";
import { Check, Plus, X } from "lucide-react";
import { addGenre, updateGenre } from "../../apis/genre.api";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading";

const GenreList = () => {
  const queryClient = useQueryClient();
  const { data: genres } = useQuery<{ data: Gerne[] }>({
    queryKey: ["genreList"],
  });
  const genreList = genres?.data;
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState("");

  // ADD GENRE
  const { mutateAsync: addGenreApi, isPending: isAddingGenre } = useMutation({
    mutationFn: (formData: GenreAdd) => addGenre(formData),
    onSuccess: async () => {
      toast.success("Genre added");
      await queryClient.invalidateQueries({ queryKey: ["genreList"] });
      setName("");
    },
    onError: (error) => {
      toast.error(error.message);
      setName("");
    },
  });
  const handleAddGenre = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addGenreApi({ name });
  };

  // UPDATE GENRE
  const { mutateAsync: updateGenreApi, isPending: isUpdatingGenre } =
    useMutation({
      mutationFn: (formData: Gerne) => updateGenre(formData, id as string),
      onSuccess: async () => {
        toast.success("Genre updated");
        await queryClient.invalidateQueries({ queryKey: ["genreList"] });
        setName("");
        setId(null);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  const handleUpdateGenre = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateGenreApi({ _id: id as string, name });
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-4xl font-bold uppercase tracking-wide">
        Genres Management
      </h1>
      <div className="flex flex-col md:flex-row gap-2 items-center mt-2">
        <form
          onSubmit={id ? handleUpdateGenre : handleAddGenre}
          className="flex-1 flex items-end gap-2 w-full"
        >
          <Input
            placeholder="Add Genre..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {id && (
            <button
              type="button"
              className="btn btn-neutral"
              onClick={() => {
                setId(null);
                setName("");
              }}
            >
              <X />
            </button>
          )}
          <button
            type="submit"
            className="btn btn-neutral"
            disabled={isAddingGenre || isUpdatingGenre}
          >
            {id ? (
              isUpdatingGenre ? (
                <Loading />
              ) : (
                <Check />
              )
            ) : isAddingGenre ? (
              <Loading />
            ) : (
              <Plus />
            )}
          </button>
        </form>

        <div className="flex-1 w-full">
          <Input placeholder="Search..." type="search" />
        </div>
      </div>

      <div className="divider"></div>

      <Genres genreList={genreList} setId={setId} setName={setName} />
    </div>
  );
};

export default GenreList;
