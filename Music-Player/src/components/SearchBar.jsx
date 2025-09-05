import React, { useState } from "react";

export default function SearchBar({ setTracks }) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      // Using corsproxy.io to bypass CORS for testing
      const res = await fetch(
        `https://corsproxy.io/?https://api.deezer.com/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setTracks(data.data || []); //  Deezer returns { data: [...] }
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  return (
    <form onSubmit={handleSearch} className=" ">
      <input
        type="text"
        placeholder="Search songs or artists..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className=""
      />
      <button className="">
        Search
      </button>
    </form>
  );
}
