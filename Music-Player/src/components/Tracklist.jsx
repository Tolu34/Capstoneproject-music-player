import React from "react";

export default function TrackList({ 
  tracks, 
  playTrack, 
  addToFavorites, 
  currentTrack, 
  isPlaying 
}) {
  if (!tracks || tracks.length === 0) {
    return <p className="">No tracks found</p>;
  }

  return (
    <div className="">
      {tracks.map((track, index) => (
        <div
          key={track.id}
          className=""
          onClick={() => playTrack(track, index)}  // only tells App which track to play
        >
          <img
            src={track.album?.cover_medium || "/images/placeholder.png"}
            alt={track.title}
            className=""
          />

          <div className="">
            <span className="">{track.title}</span>
            <span className="">{track.artist?.name}</span>
          </div>

          {/* Play/Pause button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // don’t bubble to parent div
              playTrack(track, index);
            }}
            className=""
          >
            {currentTrack?.id === track.id && isPlaying ? "⏸" : "▶"}
          </button>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              addToFavorites(track);
            }}
            className=""
          >
            ❤️
          </button>
        </div>
      ))}
    </div>
  );
}
