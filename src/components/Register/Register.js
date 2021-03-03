import Auth from "../Auth/Auth";
import React from "react";
import { propsAuthRegister } from '../../utils/constants';
import { useHistory } from "react-router";

function Register() {
  const history = useHistory();
  const handleRegistration = () => {
    history.push("/signin")
  }
  return (
    <Auth {...propsAuthRegister} onSubmit={handleRegistration}/>
  );
}

export default Register;
