import Auth from "../Auth/Auth";
import React from "react";
import { PROPS_REGISTRATIONS } from "../../utils/constants";

function Register({ onRegistration }) {
  return (
    <Auth {...PROPS_REGISTRATIONS} onSubmit={onRegistration}/>
  );
}

export default Register;
