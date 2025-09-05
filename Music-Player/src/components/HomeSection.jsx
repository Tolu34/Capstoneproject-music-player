import React from "react";

function HomeSection({ title, subtitle, children }) {
  return (
    <div className="">
      {/* Section header */}
      <div className="">
        <div className="">
          <h2 className="">{title}</h2>
          {subtitle && <p className="">{subtitle}</p>}
        </div>
        <button className="">See all</button>
      </div>

      {/* Track row */}
      <div className="">
        {children}
      </div>
    </div>
  );
}

export default HomeSection;
