import { Anime } from "../types";
import Overlay from "./Overylay";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";

interface Props {
  anime: Anime;
  onClose: () => void;
}

const ViewMovieModal = ({ anime, onClose }: Props) => {
  const [isPosterLoading, setPosterLoading] = useState(true);
  const [isCoverLoading, setCoverLoading] = useState(true);

  return (
    <Overlay>
      <div className="bg-black border border-[#b94b7f] rounded-md max-w-[1000px] p-5 flex flex-col gap-y-5">
        <div className="relative">
          {isCoverLoading && (
            <Skeleton className="absolute inset-0 h-[300px] w-full rounded-md bg-white/20" />
          )}
          <img
            className={`w-full h-[300px] object-cover rounded-md transition-opacity `}
            src={
              anime.attributes.coverImage?.large ??
              anime.attributes.posterImage?.original ??
              "/placeholder-image.jpg"
            }
            onLoad={() => setCoverLoading(false)}
            alt="Poster"
          />
        </div>

        <div className="flex gap-x-5">
          <div className="relative w-[200px] h-[300px]">
            {isPosterLoading && (
              <Skeleton className="absolute inset-0 w-full h-full rounded-md bg-white/20" />
            )}
            <img
              className={`w-full h-full object-cover rounded-md transition-opacity `}
              src={
                anime.attributes.posterImage?.small ?? "/placeholder-image.jpg"
              }
              onLoad={() => setPosterLoading(false)}
              alt="Movie Cover"
            />
          </div>

          <div className="flex flex-col gap-2 w-full justify-between">
            <div>
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col text-start gap-x-2">
                  <span className="font-bold text-[#b94b7f] text-[25px]">
                    {anime.attributes.titles?.en ??
                      anime.attributes.titles?.en_jp ??
                      "Untitled"}
                  </span>
                  <span className="text-sm font-light text-white">
                    ({anime.attributes.startDate || "Unknown Release Date"})
                  </span>
                </div>
              </div>

              <div className="mt-4 text-sm font-light">
                <span className="text-white">
                  {anime.attributes.description || "No description available."}
                </span>
              </div>
            </div>

            <div className="mt-3">
              <Button
                onClick={onClose}
                className="border border-[#b94b7f] text-[#b94b7f]"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default ViewMovieModal;
