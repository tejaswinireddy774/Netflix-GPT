// import MovieList from "./MovieList";
// import { useSelector } from "react-redux";

// const SecondContainer = () => {
//   const movies = useSelector((store) => store.movies)
  
//   return (
//     <div className="bg-black">
//         <div className=" mt-0 md:-mt-24 pl-4 md:pl-12 relative z-20">
//         <MovieList title= {"Now Playing Movies"} movies={movies.nowPlayingMovies}/>
//         <MovieList title= {"Top Rated Movies"} movies={movies.topRatedMovies}/>
//         <MovieList title= {"Today's Fresh Pick"} movies={movies.todaysFreshPick}/>
//         <MovieList title= {"Currently On"} movies={movies.currentlyOn}/>
//         <MovieList title= {"UpComing Movies"} movies={movies.upComingMovies}/>
//         <MovieList title= {"Popular Movies"} movies={movies.popularMovies}/>
//         <MovieList title= {"Popular TV Series"} movies={movies.popularTvShows}/>
//         <MovieList title= {"All-Time Hit's"} movies={movies.topRatedSeries}/>
//         </div>
//     </div>
//   );
// }

// export default SecondContainer; 


import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black">
      <div className="mt-0 md:-mt-24 pl-4 md:pl-12 relative z-20">
        {/* ✅ Movies */}
        <MovieList title={"Now Playing Movies"} movies={movies.nowPlayingMovies} type="movie" />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} type="movie" />
        <MovieList title={"UpComing Movies"} movies={movies.upComingMovies} type="movie" />
        <MovieList title={"Popular Movies"} movies={movies.popularMovies} type="movie" />

        {/* ✅ TV Shows */}
        <MovieList title={"Popular TV Series"} movies={movies.popularTvShows} type="tv" />
        <MovieList title={"All-Time Hit's"} movies={movies.topRatedSeries} type="tv" />
        <MovieList title={"Today's Fresh Pick"} movies={movies.todaysFreshPick} type="tv" />
        <MovieList title={"Currently On"} movies={movies.currentlyOn} type="tv" />
      </div>
    </div>
  );
};

export default SecondContainer;
