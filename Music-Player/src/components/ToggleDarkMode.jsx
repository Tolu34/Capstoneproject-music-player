
import React, { useEffect, useState } from "react";

export default function ToggleDarkMode({ darkMode, toggleDarkMode}) {
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <button
    type="button"
      onClick={toggleDarkMode}
      className="px-3 py-2 rounded-lg 
                 bg-gray-200 dark:bg-gray-700 
                 text-gray-900 dark:text-gray-100 
                 transition-colors duration-300 shadow-md"
    >
      {darkMode ? "Light" : "Dark"}
    </button>
  );
}
