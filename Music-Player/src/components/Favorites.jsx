import React from "react";

export default function Favorites({ favorites, setCurrentTrack, removeFromFavorites }) {
  if (favorites.length === 0) {
    return <p className="text-center text-gray-400">No favorites yet ❤️</p>;
  }

  return (
    <div className="">
      {favorites.map((track) => (
        <div
          key={track.id}
          className=""
        >
          {/* Click to play */}
          <div
            className=""
            onClick={() => setCurrentTrack(track)}
          >
            <img
              src={track.album?.cover_medium || "/images/placeholder.png"}
              alt={track.title}
              className=""
            />
            <div>
              <p className="">{track.title}</p>
              <p className="">{track.artist?.name}</p>
            </div>
          

          {/* Remove button */}
          <div className="">
          <button
            onClick={(e) =>  {
              e.stopPropagation();
              removeFromFavorites(track.id);
            }}
            className=""
          >
            ❌
          </button>
          </div>
        </div>
        </div>
      ))}
    </div>
  );
}
