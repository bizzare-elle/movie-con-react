import { Anime } from "../types";
import Overlay from "./Overylay";
import { IoMdCloseCircle } from "react-icons/io";

interface Props {
  anime: Anime;
  onClose: () => void;
}

const ViewMovieModal = ({ anime, onClose }: Props) => {
  const { attributes } = anime;

  return (
    <Overlay>
      <div className="bg-black border border-[#b94b7f] rounded-md min-w-[700px] p-5 flex gap-x-5">
        <div>
          <img
            className="max-h-[800px]"
            src={anime.attributes.posterImage.large}
            alt="Movie Cover"
          />
        </div>
        <div className="flex flex-col gap-x-2 w-full">
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col text-start gap-x-2">
              <span className="font-bold text-[#b94b7f] text-[20px]">
                {anime.attributes.titles.en
                  ? anime.attributes.titles.en
                  : anime.attributes.titles.en_jp}
              </span>
              <span className="text-sm font-light">
                ({anime.attributes.startDate})
              </span>
            </div>
            <div className="flex justify-end">
              <button onClick={onClose}>
                <IoMdCloseCircle size={20} className="text-[#b94b7f]" />
              </button>
            </div>
          </div>
          <div className="mt-4 max-w-[500px] text-sm font-light">
            <span className="text-white">{anime.attributes.description}</span>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default ViewMovieModal;
