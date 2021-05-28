import React from "react";
import "../css/MapNav.css";

const MapNav = ({ children }) => {
  return (
    <>
      <nav className='map-nav'>
        <ul>{children}</ul>
      </nav>
    </>
  );
};

export default MapNav;
