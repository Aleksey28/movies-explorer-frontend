import Auth from "../Auth/Auth";
import React from "react";
import { propsAuthLogIn } from "../../utils/constants";

function Login({ onAuthorization }) {
  const handleSignIn = (data) => {
    onAuthorization(data);
  };
  return (
    <Auth {...propsAuthLogIn} onSubmit={handleSignIn}/>
  );
}

export default Login;
