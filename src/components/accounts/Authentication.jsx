import React, { useState } from "react";
import SigninPage from "./SigninPage";
import SignupPage from "./SignupPage";

const Authentication = ({ handleClose }) => {
  const [haveAccount, setHaveAccount] = useState(false);

  return (
    <>
      {haveAccount ? (
        <SigninPage setAccount={setHaveAccount} handleClose={handleClose} />
      ) : (
        <SignupPage setAccount={setHaveAccount} handleClose={handleClose} />
      )}
    </>
  );
};

export default Authentication;
