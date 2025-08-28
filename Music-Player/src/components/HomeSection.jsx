import React from "react";

function HomeSection({ title, subtitle, children }) {
  return (
    <div className="mb-8">
      {/* Section header */}
      <div className="flex items-baseline justify-between mb-4">
        <div className="home-section">
          <h2 className="text-xl font-bold">{title}</h2>
          {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>
        <button className="text-sm text-blue-500 hover:underline">See all</button>
      </div>

      {/* Track row */}
      <div className="track-row">
        {children}
      </div>
    </div>
  );
}

export default HomeSection;
