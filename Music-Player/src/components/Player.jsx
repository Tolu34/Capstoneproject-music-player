import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaListUl } from "react-icons/fa";
import { MdDevices } from "react-icons/md";

function Player({ currentTrack, isPlaying, setIsPlaying, playNext, playPrev }) {
  const audioRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Format time helper (mm:ss)
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
useEffect(() => {
  if (!audioRef.current) return;
  if (!currentTrack?.preview) return;

  audioRef.current.src = currentTrack.preview;

  if (isPlaying) {
    audioRef.current
      .play()
      .catch(err => console.warn("Play failed:", err));
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
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
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
      <div className="player-bar">
        {/* Left: Album art + info */}
        <div className="player-left">
          <img
            src={currentTrack.album.cover_medium}
            alt={currentTrack.title}
            className="album-art"
          />
          <div className="track-info">
            <p className="track-title">{currentTrack.title}</p>
            <p className="track-artist">{currentTrack.artist.name}</p>
          </div>
        </div>

        {/* Center: Playback controls + progress */}
        <div className="player-center">
          <div className="controls">
            <button onClick={playPrev} className="control-btn">
              <FaStepBackward size={18} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="play-btn"
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button onClick={playNext} className="control-btn">
              <FaStepForward size={18} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="progress-container">
            <span className="time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={audioRef.current?.duration || 0}
              value={audioRef.current?.currentTime || 0}
              onChange={handleSeek}
              className="progress-bar"
            />
            <span className="time">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Extra controls */}
        <div className="player-right">
          <button className="icon-btn">
            <FaListUl size={18} />
          </button>
          <button className="icon-btn">
            <MdDevices size={20} />
          </button>
          <div className="volume-control">
            <FaVolumeUp size={16} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-bar"
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

export default Player;
