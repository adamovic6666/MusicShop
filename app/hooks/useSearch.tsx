import { useState } from "react";

const useSearch = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (text: string) => setSearch(text);

  return { search, handleSearch };
};

export default useSearch;
