import iconLogo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import React from "react";
import "./Logo.css";

function Logo({ elementClass }) {
  return (
    <Link className={`logo ${elementClass}`} to="/">
      <img src={iconLogo} alt="Логотип. Переход к главной странице."/>
    </Link>
  );
}

export default Logo;
