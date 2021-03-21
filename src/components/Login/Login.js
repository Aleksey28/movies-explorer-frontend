import Auth from "../Auth/Auth";
import React from "react";
import { PROPS_LOGIN } from "../../utils/constants";

function Login({ onAuthorization }) {
  const handleSignIn = (data) => {
    onAuthorization(data);
  };
  return (
    <Auth {...PROPS_LOGIN} onSubmit={handleSignIn}/>
  );
}

export default Login;
