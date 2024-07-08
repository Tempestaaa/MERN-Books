import { useQuery } from "@tanstack/react-query";
import { getAllFavourites } from "../../apis/user.api";
import { Book } from "../../types/book.type";
import BookCard from "../../components/book/BookCard";
import FavouritesSkeleton from "../../components/favourites/FavouritesSkeleton";

const Favourites = () => {
  const { data: favourites, isLoading } = useQuery<{ data: Book[] }>({
    queryKey: ["favourites"],
    queryFn: () => getAllFavourites(),
    staleTime: 2 * 60 * 1000,
  });

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-4xl font-bold uppercase tracking-wide">
        Favourite Books
      </h1>

      <div className="divider" />

      <section className="grid gap-x-4 gap-y-2 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        {isLoading ? (
          <FavouritesSkeleton />
        ) : (
          <>
            {favourites?.data.map((item) => (
              <BookCard key={item._id} item={item} />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Favourites;
