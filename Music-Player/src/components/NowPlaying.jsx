import React from "react";

export default function NowPlaying({ currentTrack, isPlaying }) {
  return (
    <div className="now-playing">
      {currentTrack ? (
        <>
          <img
            src={currentTrack.album?.cover_medium}
            alt={currentTrack.title}
            className="now-playing-cover"
          />
          <div className="now-playing-info">
            <h3 className="now-playing-title">{currentTrack.title}</h3>
            <p className="now-playing-artist">{currentTrack.artist.name}</p>
            <p className="now-playing-status">
              {isPlaying ? "Playing now..." : "Paused"}
            </p>
          </div>
        </>
      ) : (
        <p className="now-playing-empty">No song selected</p>
      )}
    </div>
  );
}
