import React from "react"
export default function TrackItem({ track, setCurrentTrack, addToFavorites }) {
  return (
    <div className="">
      <img
        src={track.album?.cover_medium}
        alt={track.title}
        className=""
      />
      <div className="">
        <h3 className="">{track.title}</h3>
        <p className="">{track.artist?.name}</p>
      </div>
      <div className="">
      <button
        onClick={() => setCurrentTrack(track)}
        className=""
      >
        
        ▶
      
      </button>
      <button
        onClick={() => addToFavorites(track)}
        className=""
      >
        ❤️
      </button>
    </div>
    </div>
  );
}
