import Auth from "../Auth/Auth";
import React from "react";
import { propsAuthLogIn } from '../../utils/constants';

function Login() {
  return (
    <Auth {...propsAuthLogIn}/>
  );
}

export default Login;
