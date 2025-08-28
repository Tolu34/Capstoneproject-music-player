import React from "react";
import ToggleDarkMode from "./ToggleDarkMode";

export default function Navbar({ showFavorites, setShowFavorites, darkMode, toggleDarkMode }) {
  return (
    <nav className="flex justify-between items-center 
                    px-6 py-3 
                    bg-black dark:bg-gray-900 
                    shadow-md sticky top-0 z-50 
                    transition-colors duration-300">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 ">MySpotify</h1>

      <div className="flex gap-4 items-center">
        <ToggleDarkMode darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="text-sm bg-green-500 text-white px-3 py-1 rounded"
        >
          {showFavorites ? "Back" : "Favorites"}
        </button>
      </div>
    </nav>
  );
}
