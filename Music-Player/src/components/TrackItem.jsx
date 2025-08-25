import React from "react"
export default function TrackItem({ track, setCurrentTrack, addToFavorites }) {
  return (
    <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-4">
      <img
        src={track.album?.cover_medium}
        alt={track.title}
        className="w-16 h-16 rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{track.title}</h3>
        <p className="text-sm text-gray-500">{track.artist?.name}</p>
      </div>
      <button
        onClick={() => setCurrentTrack(track)}
        className="bg-green-500 px-3 py-1 rounded text-white"
      >
        ▶
      </button>
      <button
        onClick={() => addToFavorites(track)}
        className="ml-2 text-red-500"
      >
        ❤️
      </button>
    </div>
  );
}
