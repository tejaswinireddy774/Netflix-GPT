import React, { useState, useEffect, useRef } from "react";
import netflix_logo from "../Utils/netflix_logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/firebase.js";
import openai from "../Utils/openai.js";
import { API_Options } from "../Utils/Constants.js";
import { addGptMovieResult } from "../Utils/gptSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const Header2 = ({ forceBlack = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 86);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close search box when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowInput(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((error) => console.error("Sign out error:", error));
  };
 

 // GPT search logic (debounced)
  const handleGptSearch = async (query) => {
    if (!query) return;

    // ask GPT for movie recommendations
      const gptResults  = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // or your free model
        messages: [
          {
            role: "user",
            content: `Act as a Movie Recommendation System. Based on the query: "${query}", suggest exactly 5 movie or TV show names. 
- Always include the searched movie or TV show name in the results (if it exists), followed by 4 similar or related titles. 
- If the query is a genre, mood, or theme, suggest 5 titles that match it. 
- Respond with only the names, separated by commas. 
Example result: Good Will Hunting, Dead Poets Society, The Social Network, A Beautiful Mind, Rain Man`},

          
        ],
      });

    if (!gptResults.choices) {
      // TODO: Write Error Handling
    }


    // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

    // For each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(addGptMovieResult({tmdbResults}));
  }

  
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/multi?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_Options
    );
    const json = await data.json();

    return json.results;
  };   


  // debounce input
useEffect(() => {
  if (!searchQuery) {
    setResults([]);
    return;
  }
  const timeout = setTimeout(() => {
    handleGptSearch(searchQuery);
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  }, 2000);
  return () => clearTimeout(timeout);
}, [searchQuery]);



  return (
   <header
  className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300
    ${forceBlack ? "bg-black" : (isScrolled ? "bg-black" : "bg-gradient-to-b from-black/60 to-transparent")}
  `}
>
  <div className="flex flex-wrap items-center justify-between max-w-[90rem] mx-auto 
                  px-3 sm:px-5 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4 gap-y-2">
    {/* Left section (Logo + Nav links) */}
    <div className="flex flex-wrap items-center gap-3 sm:gap-5 md:gap-7">
      <img
        src={netflix_logo}
        alt="Netflix Logo"
        className="h-[32px] w-auto sm:h-[40px] md:h-[50px] lg:h-[60px] object-contain"
      />

      <nav className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-white font-medium">
        <Link
          to="/browser"
          className="px-2 sm:px-3 py-1 text-[13px] sm:text-[15px] md:text-[16px] lg:text-[18px] hover:text-gray-300"
        >
          Home
        </Link>
        <Link
          to="/my-list"
          className="px-2 sm:px-3 py-1 text-[13px] sm:text-[15px] md:text-[16px] lg:text-[18px] hover:text-gray-300"
        >
          My List
        </Link>
        <Link
          to="/browse/movies"
          className="px-2 sm:px-3 py-1 text-[13px] sm:text-[15px] md:text-[16px] lg:text-[18px] hover:text-gray-300"
        >
          Movies
        </Link>
        <Link
          to="/browse/tv-shows"
          className="px-2 sm:px-3 py-1 text-[13px] sm:text-[15px] md:text-[16px] lg:text-[18px] hover:text-gray-300"
        >
          TV Shows
        </Link>
      </nav>
    </div>

    {/* Right section (Search + Sign Out) */}
    <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
      <div ref={wrapperRef} className="relative flex items-center">
        <button
          onClick={() => setShowInput((prev) => !prev)}
          className="mr-1 sm:mr-2 md:mr-3"
        >
          <i className="fa-solid fa-magnifying-glass text-white text-lg sm:text-xl md:text-2xl"></i>
        </button>

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`absolute right-9 sm:right-11 md:right-12 px-2 sm:px-3 py-1 
            rounded-xl border border-gray-400 bg-black/30 backdrop-blur-sm 
            text-white placeholder-gray-300 transition-all duration-300 ease-in-out 
            text-xs sm:text-sm md:text-base
            ${showInput ? "opacity-100 w-28 sm:w-40 md:w-52 lg:w-64" : "opacity-0 w-0 overflow-hidden"}`}
        />
      </div>

      <button
        onClick={handleSignOut}
        aria-label="Sign out"
        className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl 
          text-[11px] sm:text-[13px] md:text-[15px] 
          bg-[#e80c25] hover:bg-[#c80b20] text-white font-medium 
          transition-colors duration-200"
      >
        Sign Out
      </button>
    </div>
  </div>
</header>


  );
};



export default Header2;
