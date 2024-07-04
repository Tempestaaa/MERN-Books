const BookSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col sm:flex-row gap-8">
      <section className="flex flex-col gap-4 sm:w-1/3">
        <div className="skeleton h-[450px]" />
        <div className="skeleton h-12" />
        <div className="skeleton h-12" />
      </section>
      <section className="flex flex-col gap-2 sm:w-1/3 flex-1">
        <div className="skeleton h-8 w-3/4" />
        <div className="skeleton h-12" />
        <div className="skeleton h-6 w-1/4" />
        <div className="skeleton h-40" />
        <div className="skeleton h-1 divider" />
        <div className="skeleton h-6 w-1/2" />
        <div className="skeleton h-6 w-2/3" />
        <div className="skeleton h-6 w-1/4" />
        <div className="skeleton h-6 w-1/5" />
        <div className="skeleton h-6" />
        <div className="skeleton h-1 divider" />
        <div className="skeleton h-10 w-3/4" />
        <div className="skeleton h-40" />
        <div className="flex gap-2 justify-between">
          <div className="skeleton h-12 w-1/2" />
          <div className="skeleton h-12 w-2/12" />
        </div>
      </section>
    </div>
  );
};

export default BookSkeleton;
