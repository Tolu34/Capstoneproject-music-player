import React from "react";

export default function TrackList({ 
  tracks, 
  playTrack, 
  addToFavorites, 
  currentTrack, 
  isPlaying 
}) {
  if (tracks.length === 0) {
    return <p className="p-4 text-gray-500">No tracks found </p>;
  }

  return (
    <div className="p-4 space-y-3">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
        >
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => playTrack(track)}
          >
            <img
              src={track.album?.cover_medium}
              alt={track.title}
              className="w-12 h-12 rounded"
            />
            <div>
              <p className="font-semibold">{track.title}</p>
              <p className="text-sm text-gray-500">{track.artist?.name}</p>
            </div>
          </div>

          {/*  Play/Pause toggle */}
          <button
            onClick={() => playTrack(track)}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            {currentTrack?.id === track.id && isPlaying ? "⏸" : "▶"}
          </button>

          {/* Favorite button */}
          <button
            onClick={() => addToFavorites(track)}
            className="text-red-500 hover:scale-110 transition"
          >
            ❤️
          </button>
        </div>
      ))}
    </div>
  );
}
