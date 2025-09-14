import React from "react";
import background from "../Utils/background.png";
import Header1 from "./Header1.js";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import useTodaysFreshPick from "../Hooks/useTodaysFreshPick";
import DivCards from "./DivCards";
import FAQ from "./FAQ";
import Footer from "./Footer";

const Main = () => {
    const movies = useSelector((store) => store.movies)
      useTodaysFreshPick();

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
  {/* Blurred Background Layer */}
  <div
    className="absolute top-0 left-0 w-full h-[70vh] sm:h-[75vh] md:h-[80vh] bg-cover bg-center blur-[6px] sm:blur-[7px] md:blur-[9px] scale-110 brightness-[0.5]"
    style={{ backgroundImage: `url(${background})` }}
  ></div>

  {/* Overlay Gradient Layer */}
  <div className="absolute top-0 left-0 w-full h-[600px] sm:h-[700px] md:h-[800px] z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.9)_4px,rgba(153,80,79,0.9)_50%,rgba(0,0,0,0.8)_100%)]"></div>

  {/* Main Content Layer */}
  <div className="relative z-50">
    <Header1 />

    {/* Hero Section with Image and Text */}
    <div
      className="relative bg-cover bg-center rounded-2xl sm:rounded-3xl h-[65vh] sm:h-[70vh] md:h-[80vh] w-[95vw] sm:w-[92vw] md:w-[90vw] m-auto"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* SVG Wave Decoration */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(120, 55, 54, 0.9)"
          d="M0,320 C480,275 960,275 1440,320 L1440,320 L0,320 Z"
        />
      </svg>

      {/* Overlay Gradient + Centered Text */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,17,17,0.6)_10px,rgba(0,0,0,0.9)_60%,rgba(18,17,17,0.6)_100%)] rounded-2xl sm:rounded-3xl">
        <div className="flex flex-col items-center justify-center h-full text-white font-medium text-center px-3 sm:px-6">
          <h1
            className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[54px] 
                       p-0 m-0 leading-snug sm:leading-tight font-[800]"
          >
            Unlimited movies, TV <br className="hidden sm:block" />
            shows and more
          </h1>
          <h3
            className="text-[16px] sm:text-[20px] md:text-[24px] lg:text-[26px] 
                       font-[400] mt-3 sm:mt-4"
          >
            Starts at ₹149. Cancel at any time.
          </h3>
        </div>
      </div>
    </div>

    {/* Dummy Content Below */}
   
   <div className= "w-[80vw] m-auto">
    <MovieList title= {"Trending Now"} movies={movies.todaysFreshPick} showRank={true} disableHover={true}/>
    <DivCards />
    <FAQ />
    <Footer />
   </div>
   
  </div>
</div>
  );
};

export default Main;
