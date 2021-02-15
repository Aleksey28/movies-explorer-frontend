import "./Navigation.css";
import React from "react";
import { NavLink } from "react-router-dom";
import ProfileIcon from "../../images/profile.svg";

function Navigation(loggedIn = false) {
  return (
    <div className="navigation">
      {loggedIn && <div className="navigation__main">
        <NavLink to={"/"}>Главная</NavLink>
        <NavLink to={"/movies"}>Фильмы</NavLink>
        <NavLink to={"/saved-movies"}>Сохраненные фильмы</NavLink>
      </div>}
      <div className="navigation__profile">
        {loggedIn && <NavLink to={"/profile"}>Аккаунт <img src={ProfileIcon} alt="Переход к профилю."/></NavLink>}
        {!loggedIn && <NavLink to={"/signin"}>Войти</NavLink>}
        {!loggedIn && <NavLink to={"/signup"}>Регистрация</NavLink>}
      </div>
    </div>
  );
}

export default Navigation;
