import Auth from "../Auth/Auth";
import React from "react";
import { propsAuthRegister } from "../../utils/constants";

function Register({ onRegistration }) {
  const handleRegistration = (data) => {
    onRegistration(data);
  };
  return (
    <Auth {...propsAuthRegister} onSubmit={handleRegistration}/>
  );
}

export default Register;
