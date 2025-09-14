import { useSelector } from "react-redux";
import { useState } from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import TrailerPlayer from "./TrailerPlayer";

const MainContainer = () => {
  const movies = useSelector((state) => state.movies?.nowPlayingMovies);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  if (!movies) return null;

  const mainmovie = movies[1];
  const { title, overview, id } = mainmovie;

  const handlePlay = (movieId) => {
    setSelectedMovieId(movieId);
    setShowPlayer(true);
  };

  return (
    <div className="relative top-0 w-full box-border h-[40vh] sm:h-[60vh] md:h-[80vh] lg:h-[98vh]">
      {/* background video */}
      <VideoBackground movieId={id} />

      {/* overlay text */}
      <VideoTitle
        title={title}
        overview={overview}
        movieId={id}
        onPlay={handlePlay}
      />

      {/* trailer player overlay */}
      {showPlayer && (
        <TrailerPlayer
          movieId={selectedMovieId}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </div>
  );
};

export default MainContainer;
