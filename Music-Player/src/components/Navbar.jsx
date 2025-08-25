import React from "react"
export default function Navbar({ showFavorites, setShowFavorites}) {
    return (
        <nav className="bg-white p-4 flex justify-between items-center border-b">
            <h1 className="text-xl font-bold text-green-500">MySpotify</h1>
            <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="text-sm bg-green-500 text-white px=3 py-1 rounded"
                >
                    {showFavorites ? "Back" : "Favorites"}
            </button>
        </nav>
    );
}
