import "./Header.css";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import iconLogo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const [openNavigation, setOpenNavigation] = useState(false);
  const handleClickOnNavSwitch = () => {
    setOpenNavigation(!openNavigation);
  };
  return (
    <header className="header">
      <Link className="header__logo" to={"/"}>
        <img src={iconLogo} alt="Логотип. Переход к главной странице."/>
      </Link>
      {loggedIn
       ? <>
         <Navigation openNavigation={openNavigation}/>
         <button className={`header__switch-menu ${openNavigation && "header__switch-menu_opened"}`}
                 onClick={handleClickOnNavSwitch}/>
       </>
       : <ul className="header__auth">
         <li>
           <NavLink className="header__link header__link_type_signup" to="/signup">Регистрация</NavLink>
         </li>
         <li>
           <NavLink className="header__link header__link_type_signin" to="/signin">Войти</NavLink>
         </li>
       </ul>
      }
    </header>
  );
}

export default Header;
