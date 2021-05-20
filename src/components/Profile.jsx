import React from "react";
import "../css/Profile.css";

const Profile = ({ user, children }) => {
  const aviCSS = {
    background: `url("${user?.avi}")`,
  };

  return (
    <>
      <div className='header-container' style={aviCSS}>
        {/* <img src={user?.avi} className='header' alt='' /> */}
      </div>
      <div className='user-profile'>
        <div className='avi-edit'>
          <div className='avi' style={aviCSS}></div>
          {/* <img className='avi' src={user?.avi} data-holder-rendered='true' /> */}
          <div className='edit'>{children}</div>
        </div>
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
