import Auth from "../Auth/Auth";
import React from "react";
import { propsAuthRegister } from '../../utils/constants';

function Register() {
  return (
    <Auth {...propsAuthRegister}/>
  );
}

export default Register;
