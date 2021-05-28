import React from "react";
import { Link } from "react-router-dom";
import "../css/MapNav.css";

const MapNav = () => {
  return (
    <>
      <nav className='map-nav'>
        <ul>
          <li>
            <Link to='/home/'>TBR</Link>
          </li>
          <li>
            <Link to='/home/read'>Read</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MapNav;
