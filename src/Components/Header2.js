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
Example result: Good Will Hunting, Dead Poets Society, The Social Network, A Beautiful Mind, Rain Man`
},
          
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

  // helper: search movie in TMDB
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
  <div className="flex flex-row items-center justify-between max-w-[80rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4">
    <div className="flex items-center space-x-4 sm:space-x-6">
    <img
      src={netflix_logo}
      alt="Netflix Logo"
      className="h-[40px] w-[100px] sm:h-[50px] sm:w-[130px] md:h-[60px] md:w-[160px] object-contain"
    />
    <div className="flex items-center space-x-0.5 ">
  <Link
    to="/browser"
    className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-2xl text-white font-medium 
          text-[16px] sm:text-[14px] md:text-[18px] 
          text-[#fdfbfc] hover:text-[#cfcece] transition-colors duration-200"
  >
    Home
  </Link>
  <Link
    to="/my-list"
    className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-2xl text-white font-medium 
          text-[16px] sm:text-[14px] md:text-[18px] 
          text-[#fdfbfc] hover:text-[#cfcece] transition-colors duration-200"
  >
    My List
  </Link>

  {/* ✅ New Tabs */}
  <Link
    to="/browse/movies"
    className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-2xl text-white font-medium 
          text-[16px] sm:text-[14px] md:text-[18px] 
          text-[#fdfbfc] hover:text-[#cfcece] transition-colors duration-200"
  >
    Movies
  </Link>
  <Link
    to="/browse/tv-shows"
    className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-2xl text-white font-medium 
          text-[16px] sm:text-[14px] md:text-[18px] 
          text-[#fdfbfc] hover:text-[#cfcece] transition-colors duration-200"
  >
    TV Shows
  </Link>
</div>

    </div>

    <div className="flex items-center space-x-3 sm:space-x-5">
      {/* wrapper with ref */}
      <div ref={wrapperRef} className="relative flex items-center">
        <button
          onClick={() => setShowInput((prev) => !prev)}
          className="mr-2 sm:mr-4 md:mr-5"
        >
          <i className="fa-solid fa-magnifying-glass text-white text-lg sm:text-xl md:text-2xl"></i>
        </button>

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`absolute right-10 sm:right-12 px-2 sm:px-3 py-1 mx-1 rounded-xl border border-gray-400 
            bg-black/30 backdrop-blur-sm text-white placeholder-gray-300
            transition-all duration-300 ease-in-out 
            text-sm sm:text-base
            ${showInput ? "opacity-100 w-36 sm:w-48 md:w-56" : "opacity-0 w-0 overflow-hidden"}`}
        />
      </div>

      <button
        onClick={handleSignOut}
        aria-label="Sign out"
        className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-2xl text-white font-medium 
          text-[12px] sm:text-[14px] md:text-[15px] 
          bg-[#e80c25] hover:bg-[#c80b20] transition-colors duration-200"
      >
        Sign Out
      </button>
    </div>
  </div>
</header>

  );
};



export default Header2;
