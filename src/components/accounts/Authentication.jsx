import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Authentication = ({ handleClose }) => {
  const [haveAccount, setHaveAccount] = useState(false);

  return (
    <>
      {haveAccount ? (
        <SignIn setAccount={setHaveAccount} handleClose={handleClose} />
      ) : (
        <SignUp setAccount={setHaveAccount} handleClose={handleClose} />
      )}
    </>
  );
};

export default Authentication;
