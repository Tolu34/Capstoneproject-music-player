
import React from "react";
import ToggleDarkMode from "./ToggleDarkMode";

export default function Navbar({ showFavorites, setShowFavorites, darkMode, toggleDarkMode }) {
  return (
    <nav className="">
      <h1 className=" ">MySpotify</h1>

      <div className="">
        <ToggleDarkMode darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className=""
        >
          {showFavorites ? "Back" : "Favorites"}
        </button>
      </div>
    </nav>
  );
}
