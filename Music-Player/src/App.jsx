import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Favorites from "./components/Favorites";
import ToggleDarkMode from "./components/ToggleDarkMode";
import madeForYouTracks from "./tracks.json";
import recentlyPlayed from "./recentlyPlayed.json";
import HomeSection from "./components/HomeSection";
import SearchResults from "./components/SearchResults";
import NowPlaying from "./components/NowPlaying";
import SideBar from "./components/SideBar";
import "./index.css";
import Player from "./components/Player";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());


  
  // Dark mode toggle
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };
  


  // Play track
  const playTrack = (track, index = 0, sourceTracks = []) => {
    if (!track?.preview) return;

    // Same track clicked → toggle play/pause
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true));
      }
      return;
    }

    setCurrentTrack(track);
    setCurrentIndex(index);

    audioRef.current.pause();
    audioRef.current.src = track.preview;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  // Favorites
  const addToFavorites = (track) => {
    if (!favorites.some((fav) => fav.id === track.id)) {
      setFavorites([...favorites, track]);
    }
  };

  const removeFromFavorites = (trackId) => {
    setFavorites(favorites.filter((fav) => fav.id !== trackId));
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="app-container">
      
      {/* Sidebar */}
      <aside className="sidebar">
        <SideBar favorites={favorites} setShowFavorites={setShowFavorites} />
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Navbar
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <SearchBar
          setTracks={(results) => {
            setSearchResults(results);
            setIsSearching(results.length > 0);
          }}
        />

        {!showFavorites ? (
          isSearching ? (
            <SearchResults
              results={searchResults}
              playTrack={(track, index) => playTrack(track, index)}
              addToFavorites={addToFavorites}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
            />
          ) : (
            <>
              <HomeSection title="Made For You" subtitle="Daily Mixes">
                <div className="music-grid">
                  {madeForYouTracks.map((track, index) => (
                    <div
                      key={track.id}
                      className="track-card"
                      onClick={() => playTrack(track, index, madeForYouTracks)}
                    >
                      <img
                        src={
                          track.artist?.picture_medium ||
                          track.album?.cover_medium ||
                          "./images/placeholder.png"
                        }
                        alt={track.title}
                      />
                      <p>{track.title}</p>
                      <p className="artist">{track.artist.name}</p>
                    </div>
                  ))}
                </div>
              </HomeSection>

              <HomeSection title="Recently Played" subtitle="From the radio">
                <div className="music-grid">
                  {recentlyPlayed.map((track, index) => (
                    <div
                      key={track.id}
                      className="track-card"
                      onClick={() => playTrack(track, index, recentlyPlayed)}
                    >
                      <img src={track.album?.cover_medium} alt={track.title} />
                      <p>{track.title}</p>
                      <p className="artist">{track.artist.name}</p>
                    </div>
                  ))}
                </div>
              </HomeSection>
            </>
          )
        ) : (
          <Favorites
            favorites={favorites}
            setCurrentTrack={setCurrentTrack}
            removeFromFavorites={removeFromFavorites}
          />
        )}
      </main>

      {/* Now Playing */}
      <aside className="now-playing">
        <NowPlaying currentTrack={currentTrack} isPlaying={isPlaying} />
      </aside>

      {/* Player Bar */}
      <footer className="player-bar">
        <Player
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
        />
      </footer>
    </div>
  );
}

export default App;
