import OpenAI from "openai";
import { OPENAI_GPT_KEY } from "./Constants.js";

const openai = new OpenAI({
  apiKey: OPENAI_GPT_KEY,            // your real key
  baseURL: "https://openrouter.ai/api/v1", // point to OpenRouter
  dangerouslyAllowBrowser: true,
});

export default openai;
