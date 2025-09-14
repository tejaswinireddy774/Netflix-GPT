import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../Utils/Constants";
import { addTrailerMovie } from "../Utils/moviesSlice";

const useVideoTrailer = (movieId) => {
  const dispatch = useDispatch();

  // get trailer from redux
  const trailerVideo = useSelector((store) => store.movies.trailerMovie);

  useEffect(() => {
    if (!movieId) return;

    const getMovieVideos = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_Options
        );
        const json = await res.json();

        if (!json.results || json.results.length === 0) return;

        // Pick a trailer first, else fallback
        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addTrailerMovie(trailer));
      } catch (err) {
        console.error("Error fetching trailer:", err);
      }
    };

    // fetch only if not already in store
    if (!trailerVideo) {
      getMovieVideos();
    }
  }, [movieId, dispatch, trailerVideo]);

  return trailerVideo; 
};

export default useVideoTrailer;
