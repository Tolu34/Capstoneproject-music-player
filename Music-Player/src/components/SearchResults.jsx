import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function SearchResults({
  results,
  playTrack,
  addToFavorites,
  currentTrack,
  isPlaying,
}) {
  if (!results || results.length === 0) {
    return <p className="">No results found.</p>;
  }

  return (
    <div className="">
      {results.map((track, index) => {
        const isCurrent = currentTrack && currentTrack.id === track.id;

        return (
          <div
            key={track.id}
            className=""
          >
            {/* Album cover with overlay */}
            <div className="">
              <img
                src={track.album.cover_medium}
                alt={track.title}
                className=""
              />

              {/* Play/Pause button overlay */}
              <button
                onClick={() => playTrack(track, index)}
                className=""
              >
                {isCurrent && isPlaying ? (
                  <FaPause className="" />
                ) : (
                  <FaPlay className="" />
                )}
              </button>
            </div>

            {/* Track info */}
            <h3 className="">
              {track.title}
            </h3>
            <p className="">
              {track.artist.name}
            </p>

            {/* Optional Favorites button */}
            {addToFavorites && (
              <button
                onClick={() => addToFavorites(track)}
                className=""
              >
                ❤️ Favorite
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
