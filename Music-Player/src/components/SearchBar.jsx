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
      setTracks(data.data || []); // ✅ Deezer returns { data: [...] }
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 p-4">
      <input
        type="text"
        placeholder="Search songs or artists..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
        Search
      </button>
    </form>
  );
}
