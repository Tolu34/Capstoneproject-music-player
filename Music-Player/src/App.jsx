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
          />
        </>
      ) : (
        <Favorites favorites={favorites} 
        setCurrentTrack={setCurrentTrack} 
        removeFromFavorites={removeFromFavorites}
        />
      )}

      <Player currentTrack={currentTrack} />
    </div>
  );
}

export default App;
