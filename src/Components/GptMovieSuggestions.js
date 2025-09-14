import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import MovieCards from "./MovieCards";
import ShimmerGrid from "./ShimmerGrid.js";
import Header2 from "./Header2.js";
import { addGptMovieResult } from "../Utils/gptSlice"; 
import openai from "../Utils/openai";
import { API_Options } from "../Utils/Constants";

const GptMovieSuggestions = () => {
  const { gptResults } = useSelector((store) => store.gpt);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // 1. Ask GPT for movie recommendations
const gptPrompt = `You are a Movie Recommendation System. Based on the user query: "${query}", suggest exactly 5 movie or TV show titles. 
- Always include the exact query in the list if it matches a movie or TV show title. 
- If the query is a genre, mood, or theme, suggest 5 relevant titles. 
- Only respond with the names, separated by commas, without extra text. 
- If the query is ambiguous, assume it refers to a movie or show and include it first, then add 4 similar ones.`;

        const gptResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: gptPrompt }],
        });

        const textResponse = gptResponse.choices[0]?.message?.content || "";
        const movieNames = textResponse.split(",").map((name) => name.trim());

        // 2. Fetch from TMDB for each movie
        const tmdbResults = await Promise.all(
          movieNames.map(async (movie) => {
            const res = await fetch(
              `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
              API_Options
            );
            const data = await res.json();
            return data.results || [];
          })
        );

        // 3. Save in Redux
        dispatch(addGptMovieResult({ movieNames, tmdbResults }));
      } catch (err) {
        console.error("Error fetching GPT movies:", err);
      }
    };

    if (!gptResults && query) {
      fetchMovies();
    }
  }, [query, gptResults, dispatch]);

  if (!gptResults) {
    
    return <ShimmerGrid />;
  }

  const flattenedMovies = gptResults.tmdbResults.flat();

  return (
   <div className="pt-[80px] p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 bg-black bg-opacity-90">
  <Header2 />
  
  <div className="
    grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8
    grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
    place-items-center
  ">
    {flattenedMovies?.map((movie) => (
      <MovieCards
        className="
          w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px] xl:max-w-[220px]
          px-1 sm:px-2 md:px-3
        "
        key={movie.id}
        posterPath={movie.poster_path}
      />
    ))}
  </div>
</div>


  );
};

export default GptMovieSuggestions;
