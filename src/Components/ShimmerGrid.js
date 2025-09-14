import ShimmerCard from "./ShimmerCard";

const ShimmerGrid = () => {
  return (
   <div className="p-4 bg-black bg-opacity-90 min-h-screen">
  <div
    className="
      grid 
      grid-cols-2       /* default: small phones */
      sm:grid-cols-3    /* small devices */
      md:grid-cols-5    /* tablets / medium screens */
      lg:grid-cols-6    /* desktops */
      xl:grid-cols-8    /* large desktops */
      2xl:grid-cols-10  /* super wide screens */
      gap-2 sm:gap-3 md:gap-4 lg:gap-6
    "
  >
    {Array(12).fill("").map((_, i) => (
      <ShimmerCard key={i} />
    ))}
  </div>
</div>
  );
};

export default ShimmerGrid;