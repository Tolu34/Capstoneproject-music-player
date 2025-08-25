import React, { useEffect, useRef } from "react";

export default function Player({ currentTrack, isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);

  // Load new track when currentTrack changes
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.preview;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack]);

  // Sync play/pause when isPlaying changes
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-12 left-0 w-full bg-gray-100 p-4 flex items-center justify-between rounded-lg">
      <div className="flex items-center gap-3">
        <img
          src={currentTrack.album?.cover_medium}
          alt={currentTrack.title}
          className="w-12 h-12 rounded"
        />
        <div>
          <p className="font-semibold">{currentTrack.title}</p>
          <p className="text-sm text-gray-500">{currentTrack.artist?.name}</p>
        </div>
      </div>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="bg-green-500 text-white px-3 py-2 rounded-lg"
      >
        {isPlaying ? "⏸" : "▶"}
      </button>
      <audio ref={audioRef} />
    </div>
  );
}
