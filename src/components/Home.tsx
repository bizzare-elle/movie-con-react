import { useState } from "react";
import ViewMovieModal from "./ViewMovieModal";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Anime } from "../types";
import { fetchAnime } from "./hooks/setFetching";
import { Skeleton } from "./ui/skeleton";
import SearchBar from "./SearchBar";

export const queryClient = new QueryClient();

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["repoData"],
    queryFn: fetchAnime,
  });

  const handleModalOpen = (anime: Anime) => {
    setSelectedAnime(anime);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedAnime(null);
    setShowModal(false);
  };

  if (isError)
    return (
      <div className="h-[100vh] w-full bg-black flex justify-center items-center text-white">
        Error loading data
      </div>
    );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="font-outfit px-[200px] py-[20px] bg-bg text-text">
        <div className="flex justify-between pb-[20px] items-center">
          <span className="font-bold text-[30px] text-[#b94b7f]">MovieCon</span>
          <SearchBar />
        </div>

        <h3 className="text-text font-bold text-[25px]">Anime</h3>

        {isError && (
          <div className=" flex justify-center items-center font-bold">
            <h1>Error Loading Data</h1>
          </div>
        )}

        {isLoading && (
          <div className=" grid grid-cols-5 gap-4 py-5 ">
            {Array.from({ length: 20 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-[290px] h-[460px] rounded-xl bg-white/20"
              ></Skeleton>
            ))}
          </div>
        )}

        {isSuccess && (
          <div className="grid grid-cols-5 gap-4 py-5">
            {data?.data?.map((anime) => (
              <div
                key={anime.id}
                onClick={() => handleModalOpen(anime)}
                className="flex flex-wrap transition-transform duration-300 hover:scale-110 hover:bg-black"
              >
                <div className="border border-[#b94b7f] rounded-xl p-3">
                  <img
                    className="rounded-md"
                    src={anime.attributes.posterImage.small}
                    alt={anime.attributes.titles.en || "Anime Poster"}
                  />
                  <div className="py-2">
                    <h1 className="text-sm font-semibold">
                      {anime.attributes.titles.en ||
                        anime.attributes.titles.en_jp}
                    </h1>
                    <div className="flex justify-between pt-2">
                      <span className="text-[12px]">
                        {anime.attributes.startDate}
                      </span>
                      <span className="border border-[#b94b7f] text-[#b94b7f] text-[10px] py-1 px-2 rounded-lg cursor-pointer">
                        {anime.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedAnime && (
        <ViewMovieModal anime={selectedAnime} onClose={handleModalClose} />
      )}
    </QueryClientProvider>
  );
};

export default Home;
