import React from "react";

export default function Sidebar({ favorites, setShowFavorites }) {
  return (
    <aside className="sidebar">
      <div className="logo">
          <i className="fa-solid fa-compact-disc"></i> 
         <span>My Spotify</span>
  </div>
    
       <nav className="nav-menu">
      <ul >
        <li onClick={() => setShowFavorites(false)}>
          <a  href="#" > Home</a>
          </li>

        <li  onClick={() => setShowFavorites(true)}>
          <a href="#" > ({favorites.length})
        <i className="fa-solid fa-heart"></i>
          <span className="">Favorites</span>
          </a>
          </li>
      
    
          <li >
            <a href="#" >
            <i className="fa-solid fa-book-open"></i>
            <span className="">Your Library</span>
            </a>
       </li>
        
        
      </ul>
      </nav>
      

       <div className="library-section">
        <div className="library-header">
          <h2>Your Library</h2>
          <i className="fa-solid fa-plus"></i>
        </div>
        <div className="library-tags">
          <span className="tag">Playlists</span>
          <span className="tag">Artists</span>
          <span className="tag">Albums</span>
        </div>
        <div className="liked-songs">
          <p>Liked Songs</p>
          <p className="count">Playlist • 0 songs</p>
        </div>
      </div>  


    </aside>
    
  );
}
