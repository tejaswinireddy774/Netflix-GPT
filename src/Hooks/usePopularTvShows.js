import { API_Options } from '../Utils/Constants.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPopularTvShows } from "../Utils/moviesSlice.js";

const usePopularTvShows = () => {
  const dispatch = useDispatch();

  const getPopularTvShows = async () => {
    const data = await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', API_Options);
    const json = await data.json();
    dispatch(addPopularTvShows(json.results));
  }

  useEffect(() => {
    getPopularTvShows();
  }, []);
}

export default usePopularTvShows;