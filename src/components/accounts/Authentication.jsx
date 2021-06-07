import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Authentication = ({ handleClose, doesUserExist }) => {
  const [haveAccount, setHaveAccount] = useState(doesUserExist);

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
