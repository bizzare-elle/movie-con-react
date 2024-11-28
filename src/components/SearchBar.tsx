import { useState, useRef, useEffect } from "react";
import { fetchAnime } from "./hooks/setFetching";
import { useQuery } from "@tanstack/react-query";

const SearchBar = () => {
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const searchRef = useRef<HTMLDivElement>(null);

  const { data } = useQuery({
    queryKey: ["repoData"],
    queryFn: fetchAnime,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOnSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(search);

  return (
    <div ref={searchRef} className="relative">
      <input
        className="px-3 bg-transparent border border-[#b94b7f] rounded-md py-1 placeholder:text-[#b94b7f] outline-none focus:ring-2 focus:ring-[#b94b7f]"
        type="text"
        placeholder="Search"
        value={search}
        onFocus={() => setOnSearch(true)}
        onChange={(event) => setSearch(event.target.value)}
      />

      {onSearch && (
        <div className="bg-black absolute top-full left-0 w-full max-h-[300px] mt-2 p-3 border border-[#b94b7f] rounded-md shadow-lg overflow-y-auto overflow-auto z-[100]">
          {data?.data ? (
            data.data
              .filter((title) =>
                title.attributes.titles.en
                  ?.toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((filteredTitle) => (
                <div
                  key={filteredTitle.id}
                  className="p-2 text-[#b94b7f] hover:bg-white/10 cursor-pointer "
                >
                  {filteredTitle.attributes.titles.en_jp
                    ? filteredTitle.attributes.titles.en_jp
                    : filteredTitle.attributes.titles.ja_jp}
                </div>
              ))
          ) : (
            <p className="text-[#b94b7f]">Loading...</p>
          )}
          {data?.data &&
            data.data.filter((title) =>
              title.attributes.titles.en
                ?.toLowerCase()
                .includes(search.toLowerCase())
            ).length === 0 && (
              <p className="text-[#b94b7f]">No results found.</p>
            )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
