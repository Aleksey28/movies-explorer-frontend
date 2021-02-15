import "./Navigation.css";
import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <ul className="navigation">
      <li><NavLink className="navigation__item" activeClassName="navigation__item_active" to={"/"}>Главная</NavLink>
      </li>
      <li><NavLink className="navigation__item"
                   activeClassName="navigation__item_active"
                   to={"/movies"}>Фильмы</NavLink></li>
      <li><NavLink className="navigation__item"
                   activeClassName="navigation__item_active"
                   to={"/saved-movies"}>Сохраненные фильмы</NavLink></li>
    </ul>
  );
}

export default Navigation;
