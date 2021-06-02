import React, { useState } from "react";
import SigninPage from "./SigninPage";
import SignupPage from "./SignupPage";

const Authentication = () => {
  const [haveAccount, setHaveAccount] = useState(false);

  return (
    <>
      {haveAccount ? (
        <SigninPage setAccount={setHaveAccount} />
      ) : (
        <SignupPage setAccount={setHaveAccount} />
      )}
    </>
  );
};

export default Authentication;
