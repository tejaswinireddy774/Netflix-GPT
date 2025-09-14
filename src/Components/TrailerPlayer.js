import useMovieTrailer from "../Hooks/useMovieTrailer";
import "@fortawesome/fontawesome-free/css/all.min.css";

const TrailerPlayer = ({ movieId, mediaType, onClose }) => {
  const trailerVideos = useMovieTrailer(movieId, mediaType); // note plural
  if (!trailerVideos || trailerVideos.length === 0) return null;

  const trailer = trailerVideos[0]; // pick the first video safely

  return (
    <div className="fixed inset-0 z-50 bg-black flex justify-center items-center">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white p-2 bg-black/50 rounded-full hover:bg-black/70"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      {/* Video */}
      <iframe
         key={trailer.key}  
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${trailer.key}?mute=0&controls=1&modestbranding=1&rel=0&iv_load_policy=3`}
        title="Trailer"
        frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default TrailerPlayer;
