const FavouritesSkeleton = () => {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="skeleton h-[450px]" />
      ))}
    </>
  );
};

export default FavouritesSkeleton;
