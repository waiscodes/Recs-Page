import React from "react";
import "../css/Profile.css";

const Profile = ({ user, children }) => {
  return (
    <>
      <div className='user-profile'>
        <div className='header-container'>
          <img src={user?.avi} className='header' alt='' />
        </div>
        <img
          className='avi'
          alt='50x50'
          src={user?.avi}
          data-holder-rendered='true'
        />
        <div className='edit'>{children}</div>
        <div className='username'>
          <h4 className='display-name'>{user?.name}</h4>
          <p className='text-muted'>@{user?.username}</p>
        </div>
        <p className='bio'>{user?.bio}</p>
      </div>
    </>
  );
};

export default Profile;
