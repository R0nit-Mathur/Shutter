import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shutter — AI Search & Answer Engine Optimization Platform",
    short_name: "Shutter",
    description: "Improve your visibility across ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews.",
    start_url: "/",
    display: "standalone",
    background_color: "#05070A",
    theme_color: "#4F8CFF",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
