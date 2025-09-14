import { API_Options } from '../Utils/Constants.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUpComingMovies } from "../Utils/moviesSlice.js";

const useUpComingMovies = () => {
  const dispatch = useDispatch();

  const getUpComingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_Options);
    const json = await data.json();
    dispatch(addUpComingMovies(json.results));
  }

  useEffect(() => {
    getUpComingMovies();
  }, []);
}

export default useUpComingMovies;