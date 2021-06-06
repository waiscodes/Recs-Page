import React, { useState } from "react";
import SignIn from "../accounts/SignIn";
import SignUp from "../accounts/SignUp";
import "../../css/Welcome.css";

const Welcome = () => {
  const [account, setAccount] = useState(true);

  return (
    <>
      <div className='accounts'>
        {account ? (
          <SignIn setAccount={setAccount} />
        ) : (
          <SignUp setAccount={setAccount} />
        )}
      </div>
    </>
  );
};

export default Welcome;
