import "./ProfileMenu.css";
import React from "react";
import { NavLink } from "react-router-dom";
import ProfileIcon from "../../images/profile.svg";

function ProfileMenu({ loggedIn = false }) {
  console.log(loggedIn);
  return (
    <ul className="profile-menu">
      {loggedIn &&
      <li>
        <NavLink className="profile-menu__item profile-menu__item_type_profile" to="/profile">
          Аккаунт
          <img src={ProfileIcon} alt="Переход к профилю."/>
        </NavLink>
      </li>}
      {!loggedIn &&
      <li>
        <NavLink className="profile-menu__item profile-menu__item_type_signup" to="/signup">Регистрация</NavLink>
      </li>}
      {!loggedIn &&
      <li>
        <NavLink className="profile-menu__item profile-menu__item_type_signin" to="/signin">Войти</NavLink>
      </li>}
    </ul>
  );
}

export default ProfileMenu;
