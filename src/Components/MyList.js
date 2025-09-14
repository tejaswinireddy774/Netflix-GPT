// src/components/MyList.js
import { useSelector, useDispatch } from "react-redux";
import MovieCards from "./MovieCards";
import Header2 from "./Header2"; 
import { removeFromList } from "../Utils/myListSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const MyList = () => {
  const dispatch = useDispatch();
  const myList = useSelector((state) => state.myList || []);

  const handleRemove = (movieId) => {
    dispatch(removeFromList(movieId));
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Header as relative now */}
      <div className="relative">
        <Header2 />
      </div>

      {/* Give top padding so content starts below header */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-28 md:pt-32 lg:pt-36 py-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 border-b border-gray-800 pb-2">
          My List
        </h2>

        {myList.length === 0 ? (
          <div className="text-center text-gray-400 mt-20 text-lg sm:text-xl md:text-2xl">
            Your list is empty 😢
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {myList.map((movie) => (
              <div key={movie.id} className="relative group">
                <MovieCards
                  movieId={movie.id}
                  title={movie.title}
                  posterPath={movie.posterPath}
                  genres={movie.genres}
                  mediaType={movie.mediaType}
                  disableHover={false}
                />

                <button
                  onClick={() => handleRemove(movie.id)}
                  className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition duration-300"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;
