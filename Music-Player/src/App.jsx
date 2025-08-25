import React from "react"
import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";

import Player from "./components/Player";
import Favorites from "./components/Favorites";

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  
  const [isPlaying, setIsPlaying] = useState(false);

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

  //  Play/Pause toggle
  const playTrack = (track) => {
    if (currentTrack?.id === track.id) {
      // If clicking the same track, toggle play/pause
      setIsPlaying(!isPlaying);
    } else {
      // If it's a new track, start playing it
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };


  return (
    <div className="bg-white min-h-screen text-black pb-24">
      <Navbar showFavorites={showFavorites} setShowFavorites={setShowFavorites} />

      {!showFavorites ? (
        <>
          <SearchBar setTracks={setTracks} />
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

      <Player currentTrack={currentTrack}
      isPlaying={isPlaying} 
  setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

export default App;
