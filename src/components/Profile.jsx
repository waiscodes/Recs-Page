import React from "react";
import "../css/Profile.css";

const Profile = (props) => {
  const user = props.user;
  return (
    <>
      <div className='user-info'>
        <img
          className='profile-pic rounded-circle z-depth-2'
          alt='100x100'
          src={user && user.avi}
          data-holder-rendered='true'
        />

        <h4 className='display-name'>{user && user.name}</h4>
        <p className='text-muted'>{user && "@" + user.username}</p>
        <p>{user && user.bio}</p>
      </div>
    </>
  );
};

export default Profile;
