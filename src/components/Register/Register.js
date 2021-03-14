import Auth from "../Auth/Auth";
import React from "react";
import { propsAuthRegister } from "../../utils/constants";

function Register({ onRegistration }) {
  return (
    <Auth {...propsAuthRegister} onSubmit={onRegistration}/>
  );
}

export default Register;
