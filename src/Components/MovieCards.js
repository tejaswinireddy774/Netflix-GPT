import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { GENRES } from "../Utils/Constants"; 
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "../Utils/myListSlice";

const MovieCards = ({ posterPath, movieId, title, genres = [], mediaType, rank, disableHover, rank }) => {
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const hoverTimeout = useRef(null);
  const navigate = useNavigate();
  const myList = useSelector((state) => state.myList);
  const dispatch = useDispatch();
  const isInList = myList.some((m) => m.id === movieId);


  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: rect.left,
      y: rect.top,
    });

    hoverTimeout.current = setTimeout(() => {
      setHovered(true);
    }, 1000); // 1s delay
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setHovered(false);
  };

  const handlePlayButton = () => {
    if (!movieId) return;
    navigate(`/watch/${movieId}?type=${mediaType}`);
  };

  const handleListToggle = () => {
  if (isInList) {
    dispatch(removeFromList(movieId));
  } else {
    dispatch(
      addToList({
        id: movieId,
        title,
        posterPath,
        genres,
        mediaType,
      })
    );
  }
};

  useEffect(() => {
    const handleScroll = () => {
      if (hovered) {
        setHovered(false);
        clearTimeout(hoverTimeout.current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hovered]);

  if (!posterPath) return null;

  // ✅ Map genre_ids to names
  const genreNames = genres
    ?.slice(0, 3)
    .map((id) => GENRES[id] || "Unknown")
    .join(" • ");

  return (
    <div
      className={`relative w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44 cursor-pointer transition-transform duration-300 ease-out rounded-lg
            ${rank ? "mx-6" : "mx-2"}`}
      onMouseEnter={!disableHover ? handleMouseEnter : undefined}
      onMouseLeave={!disableHover ? handleMouseLeave : undefined}
    >
      {/* Ranking Number */}
      {rank && (
        <div
          className="absolute -left-6 top-3/4 transform -translate-y-1/2 
           text-[70px] sm:text-[90px] md:text-[110px] lg:text-[130px] 
           font-extrabold text-black z-20"
          style={{
            WebkitTextStroke: "2px #d3f1fcff",
            WebkitTextFillColor: "black",
          }}
        >
          {rank}
        </div>
      )}

      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w300${posterPath}`}
        alt={title}
        className="relative z-10 rounded-md object-cover w-full"
        onClick={handlePlayButton}
      />

      {/* Hover Expanded Card */}
      {!disableHover && hovered && (
        <div
          className="fixed z-[9999] w-48 sm:w-52 md:w-56 lg:w-60 xl:w-64 
               bg-neutral-900 text-white rounded-xl shadow-2xl 
               scale-110 transition duration-300 ease-out p-2 sm:p-3 md:p-4"
          style={{
            top: coords.y - 60,
            left: coords.x,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={`https://image.tmdb.org/t/p/w300${posterPath}`}
            alt={title}
            className="rounded-md w-full object-cover"
          />

          <h3 className="mt-2 text-xs sm:text-sm md:text-base font-bold truncate">
            {title}
          </h3>

          {/* Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3 mt-2">
            <button
              onClick={handlePlayButton}
              className="bg-white text-black px-2 sm:px-3 md:px-4 py-1 rounded-full flex items-center text-xs sm:text-sm md:text-base font-semibold hover:bg-gray-200 transition"
            >
              <FontAwesomeIcon icon={faPlay} className="mr-1" /> Play
            </button>
            <button
  onClick={handleListToggle}
  className="bg-gray-700 px-2 sm:px-3 md:px-4 py-1 rounded-full flex items-center text-xs sm:text-sm md:text-base font-semibold hover:bg-gray-600 transition"
>
  <FontAwesomeIcon icon={faPlus} className="mr-1" /> 
  {isInList ? "Remove" : "My List"}
</button>

          </div>

          <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-2 leading-tight sm:leading-snug">
            {genreNames}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCards;
