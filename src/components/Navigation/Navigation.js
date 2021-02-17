import "./Navigation.css";
import React from "react";
import { NavLink } from "react-router-dom";
import ProfileIcon from "../../images/profile.svg";

function Navigation() {
  return (
    <ul className="navigation">
      <li className="navigation__item">
        <NavLink className="navigation__link" activeClassName="navigation__link_active" to={"/"}>Главная</NavLink>
      </li>
      <li className="navigation__item">
        <NavLink className="navigation__link" activeClassName="navigation__link_active" to={"/movies"}>Фильмы</NavLink>
      </li>
      <li className="navigation__item">
        <NavLink className="navigation__link"
                 activeClassName="navigation__link_active"
                 to={"/saved-movies"}>Сохраненные фильмы</NavLink>
      </li>
      <li className="navigation__item navigation__item_type_profile">
        <NavLink className="navigation__link navigation__link_type_profile" to="/profile">
          Аккаунт
          <img src={ProfileIcon} alt="Переход к профилю."/>
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
