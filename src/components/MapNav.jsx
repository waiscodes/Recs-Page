import React from "react";
import { Link } from "react-router-dom";
import "../css/MapNav.css";

const MapNav = ({ profileUrl }) => {
  console.log(profileUrl);
  return (
    <>
      <nav className='map-nav'>
        <ul>
          <li>
            {profileUrl ? (
              <Link to={`/${profileUrl}/`}>TBR</Link>
            ) : (
              <Link to='/home/'>TBR</Link>
            )}
          </li>
          <li>
            {profileUrl ? (
              <Link to={`/${profileUrl}/read`}>Read</Link>
            ) : (
              <Link to='/home/read'>Read</Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MapNav;
