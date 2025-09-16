import React from "react";
import MovieCards from "./MovieCards";

const MovieList = ({
  title,
  movies,
  showRank = false,
  disableHover = false,
  type // 👈 explicit prop (movie | tv)
}) => {
  
  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-10 py-3 sm:py-5 font-netflix">
      {/* Title */}
      <h1
        className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 
               py-2 sm:py-3 md:py-4 text-white font-semibold tracking-wide"
      >
        {title}
      </h1>

      {/* Row of cards */}
      <div className="flex overflow-x-scroll no-scrollbar space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5">
        <div className="flex">
          {movies?.map((item, index) => (
            <MovieCards
              key={item.id}
              posterPath={item.poster_path}
              movieId={item.id}
              title={item.title || item.name} // title for movie, name for TV
              genres={item.genre_ids}
              // 👇 if TMDB gave media_type, use it; else fallback to list's type
              mediaType={item.media_type || type}
              rank = {showRank}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
