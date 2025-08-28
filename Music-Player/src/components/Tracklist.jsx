import React from "react";

export default function TrackList({ 
  tracks, 
  playTrack, 
  addToFavorites, 
  currentTrack, 
  isPlaying 
}) {
  if (!tracks || tracks.length === 0) {
    return <p className="p-4 text-gray-500">No tracks found</p>;
  }

  return (
    <div className="space-y-3">
      {tracks.map((track, index) => (   // include index here
        <div
          key={track.id}
          className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
          onClick={() => playTrack(track,index)}
        >
          <div
            className="flex items-center space-x-3"
            onClick={() => playTrack(track, index)}   //  pass index
          >
            <img
              src={track.album?.cover_medium || "/images/placeholder.png"}
              alt={track.title}
              className="w-12 h-12 rounded shadow-md"
            />
            <div>
              <p className="font-semibold">{track.title}</p>
              <p className="text-sm text-gray-500">{track.artist?.name}</p>
            </div>
          </div>

          {/* Play/Pause toggle */}
          <button
            onClick={() => playTrack(track, index)}   // ✅ also here
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            {currentTrack?.id === track.id && isPlaying ? "⏸" : "▶"}
          </button>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
               addToFavorites(track);
            }}

            className="text-red-500 hover:text-red-400"
          >
            ❤️
          </button>
        </div>
      ))}
    </div>
  );
}
