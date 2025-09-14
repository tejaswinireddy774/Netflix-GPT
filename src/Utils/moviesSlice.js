import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upComingMovies: null,
    popularTvShows: null,
    todaysFreshPick: null,
    currentlyOn: null,
    topRatedSeries: null,
    trailerMovie: null,
    trailerVideo: {}, // ✅ store videos per movieId
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpComingMovies: (state, action) => {
      state.upComingMovies = action.payload;
    },
    addPopularTvShows: (state, action) => {
      state.popularTvShows = action.payload;
    },
    addTodaysFreshPick: (state, action) => {
      state.todaysFreshPick = action.payload;
    },
    addCurrentlyOn: (state, action) => {
      state.currentlyOn = action.payload;
    },
    addTopRatedSeries: (state, action) => {
      state.topRatedSeries = action.payload;
    },
    addTrailerMovie: (state, action) => {
      state.trailerMovie = action.payload;
    },
   addTrailerVideo: (state, action) => {
  state.movieVideos = state.movieVideos || {};
  state.movieVideos[action.payload.movieId] = action.payload.video;
}

  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpComingMovies,
  addPopularTvShows,
  addTodaysFreshPick,
  addCurrentlyOn,
  addTopRatedSeries,
  addTrailerMovie,
} = moviesSlice.actions;

export default moviesSlice.reducer;
