import React from "react";

export default function Favorites({ favorites, setCurrentTrack, removeFromFavorites }) {
  if (favorites.length === 0) {
    return <p className="p-4 text-gray-500">No favorites yet ❤️</p>;
  }

  return (
    <div className="space-y-3">
      {favorites.map((track) => (
        <div
          key={track.id}
          className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
        >
          {/* Click to play */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setCurrentTrack(track)}
          >
            <img
              src={track.album?.cover_medium || "/images/placeholder.png"}
              alt={track.title}
              className="w-12 h-12 rounded"
            />
            <div>
              <p className="font-semibold">{track.title}</p>
              <p className="text-sm text-gray-500">{track.artist?.name}</p>
            </div>
          </div>

          {/* Remove button */}
          <button
            onClick={(e) =>  {
              e.stopPropagation();
              removeFromFavorites(track.id);
            }}
            className="text-gray-500 hover:text-red-500 transition"
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}
