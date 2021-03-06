import Auth from "../Auth/Auth";
import React from "react";
import { propsAuthLogIn } from '../../utils/constants';
import { useHistory } from "react-router";

function Login({onSignIn}) {
  const history = useHistory();
  const handleSignIn = () => {
    onSignIn();
    history.push('/');
  }
  return (
    <Auth {...propsAuthLogIn} onSubmit={handleSignIn}/>
  );
}

export default Login;
