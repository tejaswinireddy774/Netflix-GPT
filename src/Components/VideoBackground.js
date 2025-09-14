import { useSelector } from "react-redux";
import useVideoTrailer from "../Hooks/useVideoTrailer";

const VideoBackground = ({ movieId }) => {
  // Fetch trailer with hook
  const trailerVideo = useVideoTrailer(movieId);

  if (!trailerVideo) return null;

  return (
    <div
      className="absolute w-full h-[40vh] sm:h-[60vh]
        md:h-[80vh] lg:h-[98vh] xl:h-screen top-0 left-0"
    >
      <div className="relative w-full h-full">
        <iframe
          className="
            w-full h-[40vh]
            sm:h-[60vh]
            md:h-[80vh]
            lg:h-[98vh]
            xl:h-screen
          "
          src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&loop=1&playlist=${trailerVideo.key}&enablejsapi=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&origin=${window.location.origin}`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoBackground;
