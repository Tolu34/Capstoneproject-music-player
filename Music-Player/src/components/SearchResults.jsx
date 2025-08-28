// SearchResults.jsx
import React from "react";

export default function SearchResults({ results }) {
  if (!results || results.length === 0) {
    return <p className="p-4 text-gray-500">No results found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {results.map((track) => (
        <div key={track.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition">
          <img src={track.album.cover_medium} alt={track.title} className="w-full rounded" />
          <h3 className="mt-2 font-bold text-gray-900 dark:text-gray-100">{track.title}</h3>
          <p className="text-gray-700 dark:text-gray-300">{track.artist.name}</p>
        </div>
      ))}
    </div>
  );
}
