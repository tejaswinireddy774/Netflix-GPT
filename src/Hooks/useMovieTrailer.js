import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../Utils/moviesSlice";
import { API_Options } from "../Utils/Constants";

const useMovieTrailer = (movieId, mediaType = "movie") => {
  const dispatch = useDispatch();

  // get cached trailer
  const trailerVideo = useSelector(
    (state) => state.movies?.movieVideos?.[movieId]
  );

  useEffect(() => {
    if (!movieId) return;

    const getMovieVideo = async () => {
      try {
        const url = `https://api.themoviedb.org/3/${mediaType}/${movieId}/videos?language=en-US`;
        const data = await fetch(url, API_Options);
        const json = await data.json();

        if (!json.results || json.results.length === 0) {
          console.warn(`No videos found for ${mediaType} id=${movieId}`);
          return;
        }

        // Filter for YouTube trailers first
        const filteredTrailer = json.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        // fallback: any YouTube video if no trailer
        const finalVideo =
          filteredTrailer.length > 0
            ? filteredTrailer
            : json.results.filter((video) => video.site === "YouTube");

        if (finalVideo.length > 0) {
          dispatch(addTrailerVideo({ movieId, video: finalVideo }));
        } else {
          console.warn(
            `No playable YouTube trailer found for ${mediaType} id=${movieId}`
          );
        }
      } catch (err) {
        console.error("Error fetching trailer:", err);
      }
    };

    getMovieVideo();
  }, [movieId, mediaType, dispatch]);

  return trailerVideo;
};

export default useMovieTrailer;
