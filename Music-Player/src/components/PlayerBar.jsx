import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaListUl, FaVolumeUp } from "react-icons/fa";
import { MdDevices } from "react-icons/md";

function PlayerBar({ currentTrack, isPlaying, setIsPlaying, playNext, playPrev }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);

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

  // Handle volume
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    currentTrack && (
      <div className="">
        {/* Left: Album art + info */}
        <div className="">
          <img
            src={currentTrack.album.cover_medium}
            alt={currentTrack.title}
            className=""
          />
          <div>
            <p className="">{currentTrack.title}</p>
            <p className="">{currentTrack.artist.name}</p>
          </div>
        </div>

        {/* Center: Playback controls + progress */}
        <div className="">
          <div className="">
            <button onClick={playPrev} className="">
              <FaStepBackward size={18} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className=""
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button onClick={playNext} className="">
              <FaStepForward size={18} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="">
            <span className="">0:00</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className=""
            />
            <span className="">0:30</span>
          </div>
        </div>

        {/* Right: Extra controls */}
        <div className="">
          <button className="">
            <FaListUl size={18} /> {/* Queue */}
          </button>
          <button className="">
            <MdDevices size={20} /> {/* Devices */}
          </button>
          <div className="">
            <FaVolumeUp size={16} className="" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className=""
            />
          </div>
        </div>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={currentTrack.preview}
          onTimeUpdate={handleTimeUpdate}
          onEnded={playNext}
          volume={volume}
        />
      </div>
    )
  );
}

export default PlayerBar;
