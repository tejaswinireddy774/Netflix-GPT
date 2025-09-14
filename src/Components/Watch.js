import { useParams, useNavigate, useLocation } from "react-router-dom";
import TrailerPlayer from "./TrailerPlayer";

const Watch = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // read ?type=movie or ?type=tv
  const queryParams = new URLSearchParams(location.search);
  const mediaType = queryParams.get("type") || "movie";

  return (
    <TrailerPlayer
      movieId={movieId}
      mediaType={mediaType}
      onClose={() => navigate(-1)}
    />
  );
};

export default Watch;
