import React from "react"
import { useEffect, useRef, useState } from "react";

export default function Player({ currentTrack }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.preview; 
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-12 left-0 w-full bg-gray-100 p-4 flex items-center justify-between rounded-lg">
      <div className="flex items-center gap-3">
        <img
          src={currentTrack.album?.cover_medium}   // ✅ Deezer album cover
          alt={currentTrack.title}
          className="w-12 h-12 rounded"
        />
        <div>
          <p className="font-semibold">{currentTrack.title}</p>  {/* song title */}
          <p className="text-sm text-gray-500">{currentTrack.artist?.name}</p> {/*  artist name */}
        </div>
      </div>
      <button
        onClick={togglePlay}
        className="bg-green-500 text-white px-3 py-2 rounded-lg"
      >
        {isPlaying ? "⏸" : "▶"}
      </button>
      <audio ref={audioRef} />
    </div>
  );
}
