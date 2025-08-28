import React, { useRef, useEffect, useState } from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";

function PlayerBar({ currentTrack, isPlaying, setIsPlaying, playNext, playPrev }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Sync play/pause with state
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(err => console.warn("Play failed:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Update progress
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const seekTime = (e.target.value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
      setProgress(e.target.value);
    }
  };

  return (
    currentTrack && (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg">
        {/* Album art + info */}
        <div className="flex items-center gap-4">
          <img
            src={currentTrack.album.cover_medium}
            alt={currentTrack.title}
            className="w-12 h-12 rounded-md shadow-md"
          />
          <div>
            <p className="font-semibold">{currentTrack.title}</p>
            <p className="text-sm text-gray-400">{currentTrack.artist.name}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button onClick={playPrev}>
            <FaStepBackward size={18} />
          </button>
          <button
            className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="pl-1" />}
          </button>
          <button onClick={playNext}>
            <FaStepForward size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex-1 mx-6">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full accent-green-500"
          />
        </div>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={currentTrack.preview}
          onTimeUpdate={handleTimeUpdate}
          onEnded={playNext}
        />
      </div>
    )
  );
}

export default PlayerBar;
