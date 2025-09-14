// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

// const VideoTitle = ({ title, overview }) => {
//   return (
//    <div
//   className="
//     relative w-full 
//     h-[40vh] sm:h-[60vh] md:h-[80vh] lg:h-[98vh] xl:h-screen
//   "
// >
//   {/* Overlay */}
//   <div
//     className="
//       absolute inset-0 
//       px-4 sm:px-8 md:px-24 
//       flex flex-col justify-center
//       text-white 
//       bg-gradient-to-r from-black 
//       overflow-hidden
//     "
//   >
//     <h1
//       className="
//         font-bold
//         text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl
//         w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4
//         line-clamp-4
//       "
//     >
//       {title}
//     </h1>

//     <p
//       className="
//         py-4 sm:py-6 
//         text-xs sm:text-sm md:text-base lg:text-md
//         w-4/6 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4
//         line-clamp-3
//       "
//     >
//       {overview}
//     </p>

//     <div className="flex flex-col sm:flex-row gap-3 my-4 md:my-0">
//   {/* Always visible */}
//   <button className="w-auto bg-white text-black py-2 px-4 sm:px-6 text-sm sm:text-md font-medium rounded-lg hover:bg-opacity-80 flex items-center justify-center">
//     <FontAwesomeIcon icon={faPlay} className="mr-2" />
//     Play
//   </button>

//   {/* Only visible on md+ */}
//   <button className="hidden md:flex w-auto items-center bg-gray-500 text-white py-2 px-4 sm:px-6 text-sm sm:text-md bg-opacity-50 rounded-lg">
//     <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
//     More Info
//   </button>
// </div>


//   </div>
// </div>

//   );
// };

// export default VideoTitle;




import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const VideoTitle = ({ title, overview, movieId, onPlay }) => {
  return (
    <div
      className="
        relative w-full 
        h-[40vh] sm:h-[60vh] md:h-[80vh] lg:h-[98vh] xl:h-screen
      "
    >
      {/* Overlay */}
      <div
        className="
          absolute inset-0 
          px-4 sm:px-8 md:px-24 
          flex flex-col justify-center
          text-white 
          bg-gradient-to-r from-black 
          overflow-hidden
        "
      >
        <h1
          className="
            font-bold
            text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl
            w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4
            line-clamp-4
          "
        >
          {title}
        </h1>

        <p
          className="
            py-4 sm:py-6 
            text-xs sm:text-sm md:text-base lg:text-md
            w-4/6 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4
            line-clamp-3
          "
        >
          {overview}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 my-4 md:my-0">
          {/* Play Button */}
          <button
            onClick={() => onPlay(movieId)} // ✅ trigger trailer overlay
            className="w-auto bg-white text-black py-2 px-4 sm:px-6 text-sm sm:text-md font-medium rounded-lg hover:bg-opacity-80 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faPlay} className="mr-2" />
            Play
          </button>

          {/* Only visible on md+ */}
          <button className="hidden md:flex w-auto items-center bg-gray-500 text-white py-2 px-4 sm:px-6 text-sm sm:text-md bg-opacity-50 rounded-lg">
            <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
