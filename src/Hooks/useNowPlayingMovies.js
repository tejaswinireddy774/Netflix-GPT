import { API_Options } from '../Utils/Constants.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from "../Utils/moviesSlice.js";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_Options);
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  }

  useEffect(() => {
    getNowPlayMovies();
  }, []);
}

export default useNowPlayingMovies