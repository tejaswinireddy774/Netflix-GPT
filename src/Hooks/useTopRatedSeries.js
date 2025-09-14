import { API_Options } from '../Utils/Constants.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTopRatedSeries } from "../Utils/moviesSlice.js";

const useTopRatedSeries = () => {
  const dispatch = useDispatch();

  const getTopRatedSeries = async () => {
    const data = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', API_Options);
    const json = await data.json();
    dispatch(addTopRatedSeries(json.results));
  }

  useEffect(() => {
    getTopRatedSeries();
  }, []);
}

export default useTopRatedSeries;