import { API_Options } from '../Utils/Constants.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCurrentlyOn } from "../Utils/moviesSlice.js";

const useCurrentlyOn = () => {
  const dispatch = useDispatch();

  const getCurrentlyOn = async () => {
    const data = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', API_Options);
    const json = await data.json();
    dispatch(addCurrentlyOn(json.results));
  }

  useEffect(() => {
    getCurrentlyOn();
  }, []);
}

export default useCurrentlyOn;