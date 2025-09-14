import { createSlice } from "@reduxjs/toolkit";

const myListSlice = createSlice({
  name: "myList",
  initialState: [],
  reducers: {
    addToList: (state, action) => {
      const movie = action.payload;
      // Prevent duplicates
      if (!state.find((item) => item.id === movie.id)) {
        state.push(movie);
      }
    },
    removeFromList: (state, action) => {
      const movieId = action.payload;
      return state.filter((item) => item.id !== movieId);
    },
  },
});

export const { addToList, removeFromList } = myListSlice.actions;
export default myListSlice.reducer;