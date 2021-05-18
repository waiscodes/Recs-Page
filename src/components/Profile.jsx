import React from "react";
import "../css/Profile.css";

const Profile = ({ user, children }) => {
  return (
    <>
      <div className='user-profile'>
        <img
          className='avi'
          alt='50x50'
          src={user && user.avi}
          data-holder-rendered='true'
        />
        {children}
        <h4 className='display-name'>{user && user.name}</h4>
        <p className='text-muted'>{user && "@" + user.username}</p>
        <p>{user && user.bio}</p>
      </div>
    </>
  );
};

export default Profile;
