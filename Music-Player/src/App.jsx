import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import Player from "./components/Player";
import Favorites from "./components/Favorites";
import ToggleDarkMode from "./components/ToggleDarkMode";
import  "./App.css";
import madeForYouTracks from "./tracks.json";
import recentlyPlayed from "./recentlyPlayed.json"
import HomeSection from "./components/HomeSection";
import SearchResults from "./components/SearchResults";
import PlayerBar from "./components/PlayerBar";

 function App() {
 const [tracks, setTracks] = useState([]);
const [currentTrack, setCurrentTrack] = useState(null);
const [favorites, setFavorites] = useState([]);
const [showFavorites, setShowFavorites] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
 );
const [isPlaying, setIsPlaying] = useState(false);
 const audioRef = useRef(new Audio());

 //next and pause
const playNext = () => {
    if (currentIndex < tracks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const playPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Toggle dark mode
const toggleDarkMode = () => {
const newMode = !darkMode;
  setDarkMode(newMode);
  document.documentElement.classList.toggle("dark", newMode);
  localStorage.setItem("theme", newMode ? "dark" : "light");
  
};
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);


   //add to favourites
  const addToFavorites = (track) => {
    if (!favorites.find((fav) => fav.id === track.id)) {
      setFavorites([...favorites, track]);
      console.log("Added to favorites:", track);
    } else {
      console.log("Already in favorites:", track)
    }
  };

  //Remove from favorites 
  
  const removeFromFavorites = (trackId) => {
    setFavorites(favorites.filter((fav) => fav.id !== trackId));
    console.log(" Removed from favorites:", trackId);
  };

  // Play selected track
  const playTrack = (track, index) => {
    if (currentTrack?.id === track.id) {
      // Toggle play/pause if same track
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.warn("Play failed:", err));
      }
      setIsPlaying(!isPlaying);
    } else {
      // New track selected
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  // Load and play when currentTrack changes
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.preview; // ✅ Deezer preview URL
      audioRef.current.play().catch(err => console.warn("Autoplay blocked:", err));
    }
  }, [currentTrack]);
  // Keep track of ended event
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (

    <div className="text-black dark:text-white min-h-screen  pb-24 transition-colors duration-300">
      <Navbar
       showFavorites={showFavorites} 
      setShowFavorites={setShowFavorites}
       darkMode={darkMode}
  toggleDarkMode={toggleDarkMode}/>

      {!showFavorites ? (
        
        <>
    
        
        <div className="p-4 flex justify-end">
      
    </div>
        <SearchBar setTracks={setTracks} />
        

        <div className="px-4">
    <HomeSection title="Made for you" subtitle="Daily Mixes">
      {madeForYouTracks.map((track, index) => (
        <div
          key={track.id}
          className="made-card"
          onClick={() => playTrack(track, index)}
        >
          <img
            src={track.artist?.picture_medium || track.album?.cover_medium || "./images/placeholder.png"}
            alt={track.title}
            className="rounded-xl shadow-lg mb-2"
          />
          <p>{track.title}</p>
          <p className="artist">{track.artist.name}</p>
        </div>
      ))}
    </HomeSection>

    <HomeSection title="Recently Played" subtitle="From the radio">
      {recentlyPlayed.map((track, index) => (
        <div
          key={track.id}
          className="recent-card"
          onClick={() => playTrack(track, index + 3)}
        >
          <img
            src={track.album?.cover_medium}
            alt={track.title}
            className="thumbnail"
          />
          <p>{track.title}</p>
          <p className="artist">{track.artist.name}</p>
        </div>
      ))}
    </HomeSection>

    <HomeSection title="Genre">
      <div className="genre-card">
        {currentTrack ? (
          <>
            <div>
              <p>{currentTrack.title}</p>
              <p>{currentTrack.artist.name}</p>
            </div>
            <div className="btn">
              {isPlaying ? (
                <button onClick={() => audioRef.current.pause()}>⏸</button>
              ) : (
                <button onClick={() => audioRef.current.play()}>▶</button>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-sm">No song playing</p>
        )}
      </div>
    </HomeSection>
  </div>

        
          <TrackList
            tracks={tracks}
             

            setCurrentTrack={setCurrentTrack}
            addToFavorites={addToFavorites}
            playTrack={playTrack}       
            currentTrack={currentTrack} 
            isPlaying={isPlaying} 
          />
        </>

      ) : (
        <Favorites favorites={favorites} 
        setCurrentTrack={setCurrentTrack} 
        removeFromFavorites={removeFromFavorites}
        />
      )}


      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white rounded-2xl w-[90%] max-w-md p-3 shadow-lg flex items-center justify-between">

      <Player currentTrack={currentTrack}
      isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying}
         audioRef={audioRef}
      />
      </div>
    </div>
  );
}

export default App;
