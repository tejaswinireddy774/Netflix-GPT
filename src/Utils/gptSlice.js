import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice ({
    name: "gpt",
    initialState: {
        showGptSearch: false,
        gptResults: null,
    },
    reducers: {
        toggleGptSearchView: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult: (state, action) => {
            state.gptResults = action.payload;
        }
    },
});

export const { toggleGptSearchView, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;