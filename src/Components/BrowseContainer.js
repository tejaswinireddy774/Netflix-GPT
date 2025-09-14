import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MovieList from "./MovieList";
import Header2 from "./Header2";

const BrowseContainer = () => {
  const movies = useSelector((store) => store.movies);
  const { tab } = useParams(); // "movies" or "tv-shows"

  // Determine active tab based on URL param
  const activeTab = tab === "tv-shows" ? "tv" : "movies";

  return (
    <div className="bg-black min-h-screen relative pt-24">
      <div className="relative">
        <Header2 />
      </div>

      {/* Movie / TV Sections */}
      <div className="pl-4 md:pl-12 relative z-20">
        {activeTab === "movies" && (
          <>
            <MovieList title="Now Playing Movies" movies={movies.nowPlayingMovies} type="movie" />
            <MovieList title="Top Rated Movies" movies={movies.topRatedMovies} type="movie" />
            <MovieList title="UpComing Movies" movies={movies.upComingMovies} type="movie" />
            <MovieList title="Popular Movies" movies={movies.popularMovies} type="movie" />
          </>
        )}

        {activeTab === "tv" && (
          <>
            <MovieList title="Popular TV Series" movies={movies.popularTvShows} type="tv" />
            <MovieList title="All-Time Hit's" movies={movies.topRatedSeries} type="tv" />
            <MovieList title="Today's Fresh Pick" movies={movies.todaysFreshPick} type="tv" />
            <MovieList title="Currently On" movies={movies.currentlyOn} type="tv" />
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseContainer;
