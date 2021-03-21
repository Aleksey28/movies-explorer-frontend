import "./Header.css";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

function Header({ loggedIn }) {
  const [openNavigation, setOpenNavigation] = useState(false);
  const handleClickOnNavSwitch = () => {
    setOpenNavigation(!openNavigation);
  };
  return (
    <header className="header">
      <Logo elementClass="header__logo"/>
      {loggedIn
       ? <>
         <Navigation openNavigation={openNavigation} onCloseNavigation={handleClickOnNavSwitch}/>
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
