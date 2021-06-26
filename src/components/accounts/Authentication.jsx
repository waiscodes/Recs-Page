import React, { useState } from "react";
import SignIn from "./SignIn";
import Signup from "./Signup";

const Authentication = ({ handleClose, doesUserExist }) => {
  const [haveAccount, setHaveAccount] = useState(doesUserExist);

  return (
    <>
      {haveAccount ? (
        <SignIn setAccount={setHaveAccount} handleClose={handleClose} />
      ) : (
        <Signup setAccount={setHaveAccount} handleClose={handleClose} />
      )}
    </>
  );
};

export default Authentication;
