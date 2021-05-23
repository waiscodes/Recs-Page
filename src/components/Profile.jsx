import React from "react";
import "../css/Profile.css";

const Profile = ({ user, children }) => {
  return (
    <>
      <>
        <div className='user-info'>
          <div className='avi-container'>
            <div className='avi-border'>
              <img className='avi' alt='100x100' src={user?.avi} />
            </div>
          </div>

          <h4 className='display-name'>{user && user.name}</h4>
          <p className='text-muted'>{user && "@" + user.username}</p>
          <p>{user && user.bio}</p>
          <div className='edit'>{children}</div>
        </div>
      </>
    </>
  );
};

export default Profile;
