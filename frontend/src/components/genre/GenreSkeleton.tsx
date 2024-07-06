const GenreSkeleton = () => {
  return (
    <>
      {[...Array(25)].map((_, i) => (
        <div key={i} className="skeleton h-12" />
      ))}
    </>
  );
};

export default GenreSkeleton;
