
import React, { useEffect, useState } from "react";

export default function ToggleDarkMode({ darkMode, toggleDarkMode}) {
  
  
  return (
    <button
    type="button"
      onClick={toggleDarkMode}
    >
      {darkMode ? "Light" : "Dark"}
    </button>
  );
}
