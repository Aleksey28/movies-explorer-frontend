import './Header.css';
import React from "react";
import { Link } from "react-router-dom";
import iconLogo from '../../images/logo.svg';
import Navigation from "../Navigation/Navigation";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

function Header({loggedIn}) {
  return (
    <header className="header">
      <Link to={'/'}>
        <img src={iconLogo} alt="Логотип. Переход к главной странице."/>
      </Link>
      {loggedIn && <Navigation />}
      <ProfileMenu loggedIn={loggedIn}/>
    </header>
  );
}

export default Header;
