import { Anime } from "../../types";


export const fetchAnime = async (): Promise<{ data: Anime[] }> => {
  const response = await fetch(
    "https://kitsu.io/api/edge/anime?page[limit]=20"
  );
  if (!response.ok) throw new Error("Failed to fetch anime");
  return response.json();
};
