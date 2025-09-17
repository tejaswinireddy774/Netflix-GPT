import OpenAI from "openai";
import { OPENROUTER_KEY } from "./Constants.js"; // set in .env

const openai = new OpenAI({
  apiKey: OPENROUTER_KEY,               // your sk-or-v1 key
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": window.location.origin, // required by OpenRouter
    "X-Title": "Netflix GPT Clone",        // any project name
  },
  dangerouslyAllowBrowser: true,         // needed for frontend
});

export default openai;
