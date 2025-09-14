const ShimmerCard = () => (
<div
  className="
    w-28 h-36       /* default (small screens) */
    sm:w-32 sm:h-40 /* small devices */
    md:w-40 md:h-48 /* medium screens */
    lg:w-48 lg:h-56 /* large screens */
    xl:w-56 xl:h-64 /* extra large */
    2xl:w-64 2xl:h-72 /* super large */
    bg-gray-800 animate-pulse rounded-md
  "
></div>
);

export default ShimmerCard;