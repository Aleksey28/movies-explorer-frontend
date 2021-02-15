import './Header.css';
import React from "react";
import { Link } from "react-router-dom";
import iconLogo from '../../images/logo.svg';
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header">
      <Link to={'/'}>
        <img src={iconLogo} alt="Логотип. Переход к главной странице."/>
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;
