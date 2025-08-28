import React, { useEffect, useRef } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";

export default function Player({ 
  currentTrack,
  currentIndex,
  setCurrentIndex, 
  tracks, 
  isPlaying,
  setIsPlaying 
}) {
  const audioRef = useRef(null);

  // Load new track
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      if (currentTrack.preview) {
        audioRef.current.src = currentTrack.preview;
        audioRef.current.currentTime = 0; 
        if (isPlaying) {
          audioRef.current.play().catch(err => console.warn("Autoplay blocked:", err));
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack]);

  // Sync play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(err => console.warn("Play failed:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  if (!currentTrack || !tracks || tracks.length === 0) return null;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
  }
};

  const handleNext = () => {
    if (tracks && currentIndex < tracks.length - 1) {
    setCurrentIndex(currentIndex + 1);
  }
};

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[95%] md:w-[500px] 
      bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700
      rounded-2xl p-4 flex items-center justify-between gap-4 transition-colors duration-300">

      {/* Track info */}
      <div className="flex items-center gap-4">
        <img
          src={currentTrack.album?.cover_medium}
          alt={currentTrack.title}
          className="w-14 h-14 rounded-xl shadow-md"
        />
        <div className="truncate">
          <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
            {currentTrack.title}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {currentTrack.artist?.name}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button 
        type="button"
         onClick={handlePrev}
          className="text-gray-700 dark:text-gray-300 hover:text-green-500 transition">
          <FaStepBackward size={20} />
        </button>

        <button 
  type="button" 
  onClick={() => setIsPlaying(!isPlaying)}   //  just toggle state
  className="bg-green-500 hover:bg-green-600 
             text-white w-12 h-12 rounded-full
             flex items-center justify-center shadow-md 
             transition-colors duration-200">
  {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="pl-1" />}
</button>


        <button
         type="button"
          onClick={handleNext}
          disabled={currentIndex === tracks.length - 1}
          className="text-gray-400 hover:text-green-500  transition-colors">
          <FaStepForward size={20} />
        </button>
      </div>

      <audio ref={audioRef}
       preload="auto" />
    </div>
  );
}
