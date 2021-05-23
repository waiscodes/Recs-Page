import React, { useState } from "react";
import SigninPage from "./SigninPage";
import SignupPage from "./SignupPage";
import "../css/Welcome.css";

const Welcome = () => {
  const [account, setAccount] = useState(true);

  return (
    <>
      <h1>Welcome to Recs Page</h1>
      {account ? (
        <SigninPage setAccount={setAccount} />
      ) : (
        <SignupPage setAccount={setAccount} />
      )}
    </>
  );
};

export default Welcome;
