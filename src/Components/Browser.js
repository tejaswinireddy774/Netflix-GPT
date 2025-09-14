import React from "react";
import { useSelector } from "react-redux";
import Header2 from "./Header2.js";
import GptMovieSuggestions from "./GptMovieSuggestions";
import MainContainer from "./MainContainer.js";
import SecondContainer from "./SecondContainer.js";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies.js";
import usePopularMovies from "../Hooks/usePopularMovies.js";
import useTopRatedMovies from "../Hooks/useTopRated.js";
import useUpComingMovies from "../Hooks/useUpComingMovies.js";
import usePopularTvShows from "../Hooks/usePopularTvShows.js";
import useTopRatedSeries from "../Hooks/useTopRatedSeries.js";
import useTodaysFreshPick from "../Hooks/useTodaysFreshPick.js";
import useCurrentlyOn from "../Hooks/useCurrentlyOn.js";

const Browser = () => {
  useNowPlayingMovies(); // Custom hook to fetch now playing movies
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();
  usePopularTvShows();
  useTodaysFreshPick();
  useTopRatedSeries();
  useCurrentlyOn();

  return (
    <div>
      <Header2 />
      <MainContainer />
      <SecondContainer />
    </div>
  );
};

export default Browser;
