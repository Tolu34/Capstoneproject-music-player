import React from "react";

export default function NowPlaying({ currentTrack, isPlaying }) {
  return (
    <div className="player-controls">
      {currentTrack ? (
        <>
          <img
            src={currentTrack.album?.cover_medium}
            alt={currentTrack.title}
            className=""
          />
          <h3 className="">{currentTrack.title}</h3>
          <p className="">{currentTrack.artist.name}</p>
          <p>About the artist...</p>
        </>
      ) : (
        <p className="">No song selected</p>
      )}
    </div>
  );
}