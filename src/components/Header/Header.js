import "./Header.css";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import iconLogo from "../../images/logo.svg";
import imgEarth from "../../images/earth.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const [openNavigation, setOpenNavigation] = useState(false);
  const handleClickOnNavSwitch = () => {
    setOpenNavigation(!openNavigation);
  };
  return (
    <header className={`header ${!loggedIn && "header_type_public"}`}>
      <div className="header__top">
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
      </div>
      <div className="header__bottom">
        <div className="header__description">
          <h1 className="header__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="header__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a href="" className="header__show-more">Узнать больше</a>
        </div>
        <img src={imgEarth} alt="WEB around all of us." className="header__image"/>
      </div>
    </header>
  );
}

export default Header;
