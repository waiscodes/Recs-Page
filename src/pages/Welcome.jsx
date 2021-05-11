import React from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

const Welcome = () => {
  return (
    <>
      <h1>Welcome to Recs Page</h1>
      <Signin />
      <Signup />
    </>
  );
};

export default Welcome;
