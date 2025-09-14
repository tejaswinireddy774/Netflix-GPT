import React from 'react';
import netflix_logo from "../Utils/netflix_logo.png";
import { useNavigate } from "react-router-dom";
import { SUPPORTED_LANGUAGES } from "../Utils/Constants.js";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../Utils/configSlice.js";
import lang from "../Utils/languageConstants";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const handleButtonClick = () => {
    navigate("/login");
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <nav className="mb-3 w-full">
  <div className="flex flex-col md:flex-row items-center justify-between mx-4 sm:mx-8 md:mx-16 lg:mx-24 py-3 sm:py-4">
    {/* Logo */}
    <img
      src={netflix_logo}
      alt="Netflix Logo"
      className="
        h-[50px] w-[120px] sm:h-[60px] sm:w-[140px] md:h-[70px] md:w-[160px] lg:h-[80px] lg:w-[186px]
        object-contain mb-2 md:mb-0
      "
    />

    {/* Right side: Language selector + Sign In */}
    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
      {/* Language selector */}
      <div className="flex items-center bg-black/60 rounded-xl border border-gray-600 px-2 sm:px-3 py-1">
        <i className="fa-solid fa-language text-white text-sm sm:text-base md:text-lg mr-1"></i>
        <select
          value={langKey} // bind to current Redux state
          onChange={handleLanguageChange}
          className="bg-black/60 text-white text-xs sm:text-sm md:text-base px-1 py-0.5 sm:py-1 focus:outline-none"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sign In button */}
      <button
        className="
          px-3 sm:px-4 py-1 sm:py-1.5 rounded-2xl text-white font-medium
          text-xs sm:text-sm md:text-[14px]
          bg-[#e80c25] hover:bg-[#c80b20]
        "
        onClick={handleButtonClick}
      >
        {lang[langKey].signIn}
      </button>
    </div>
  </div>

  {/* Nav links below */}
  <div
    className="
      bg-black/60 backdrop-blur-md text-[#f1eeeeda]
      text-xs sm:text-sm md:text-[15px] font-medium
      px-4 sm:px-6 md:px-10 py-2 sm:py-[10px]
      rounded-[15px] sm:rounded-[20px]
      flex flex-wrap items-center justify-center sm:justify-between
      gap-2 sm:gap-4
      w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]
      m-auto mt-3
    "
  >
    <span>Popular Now</span>
    <span>Plans</span>
    <span>Reasons to Join</span>
    <span>FAQ</span>
  </div>
</nav>

  );
};

export default Header1;
