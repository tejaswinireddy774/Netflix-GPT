import { API_Options } from '../Utils/Constants.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodaysFreshPick } from "../Utils/moviesSlice.js";

const useTodaysFreshPick = () => {
  const dispatch = useDispatch();

  const getTodaysFreshPick = async () => {
    const data = await fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', API_Options);
    const json = await data.json();
    dispatch(addTodaysFreshPick(json.results));
  }

  useEffect(() => {
    getTodaysFreshPick();
  }, []);
}

export default useTodaysFreshPick;