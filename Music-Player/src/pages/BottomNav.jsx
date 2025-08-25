import { Home, Search, Heart, User } from "lucide-react";
import React from "react"
export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { name: "Home", icon: <Home size={22} /> },
    { name: "Search", icon: <Search size={22} /> },
    { name: "Favorites", icon: <Heart size={22} /> },
    { name: "Profile", icon: <User size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center py-2">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`flex flex-col items-center text-sm ${
            activeTab === tab.name ? "text-green-500" : "text-gray-500"
          }`}
        >
          {tab.icon}
          <span>{tab.name}</span>
        </button>
      ))}
    </div>
  );
}
