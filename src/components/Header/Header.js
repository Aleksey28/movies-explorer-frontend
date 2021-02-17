import "./Header.css";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import iconLogo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  return (
    <header className="header">
      <Link className="header__logo" to={"/"}>
        <img src={iconLogo} alt="Логотип. Переход к главной странице."/>
      </Link>
      {loggedIn && <Navigation/>}
      {!loggedIn &&
      <ul className="header__auth">
        <li>
          <NavLink className="header__btn header__btn_type_signup" to="/signup">Регистрация</NavLink>
        </li>
        <li>
          <NavLink className="header__btn header__btn_type_signin" to="/signin">Войти</NavLink>
        </li>
      </ul>
      }
    </header>
  );
}

export default Header;
