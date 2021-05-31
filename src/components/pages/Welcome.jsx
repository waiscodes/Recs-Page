import React, { useState } from "react";
import SigninPage from "./SigninPage";
import SignupPage from "./SignupPage";
import "../css/Welcome.css";

const Welcome = () => {
  const [account, setAccount] = useState(true);

  return (
    <>
      <div className='accounts'>
        {account ? (
          <SigninPage setAccount={setAccount} />
        ) : (
          <SignupPage setAccount={setAccount} />
        )}
      </div>
    </>
  );
};

export default Welcome;
