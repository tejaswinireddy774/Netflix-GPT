export const API_Options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDcwNGUxNjYzOGY3NDVkODQ0OTM5MTdjNjg3ZjYzMCIsIm5iZiI6MTc1NTAyMDMyMC4zMTIsInN1YiI6IjY4OWI3YzIwYjIwZWRhYTg3MjVlM2Y2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1ywoyCkQGfdjvhomctdZo2Lw6ZUTec382c4L-LR2mPA'
  }
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  ];

export const OPENAI_GPT_KEY ="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";

export const GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

const faqData = [
  {
    question: "What is Netflix?",
    answer:
      "Netflix is a streaming service that offers a wide variety of TV shows, movies, anime, documentaries, and more.",
  },
  {
    question: "How much does Netflix cost?",
    answer:
      "Netflix offers several plans depending on the region and features, typically ranging from basic to premium tiers.",
  },
  {
    question: "Where can I watch?",
    answer:
      "You can watch Netflix on smartphones, tablets, smart TVs, laptops, and streaming devices with internet access.",
  },
  {
    question: "How do I cancel?",
    answer:
      "You can cancel your Netflix subscription anytime through the 'Account' section on the website or app.",
  },
  {
    question: "What can I watch on Netflix?",
    answer:
      "Netflix has thousands of titles including movies, TV shows, documentaries, anime, and Netflix Originals.",
  },
  {
    question: "Is Netflix good for kids?",
    answer:
      "Yes, Netflix has a kids’ section with parental controls and age-appropriate content.",
  },
];

export default faqData;
