import "./Main.css";
import React from "react";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";

function Main() {
  return (
    <main className="main">
      <div className="main__container main__container_color_blue">
        <Promo/>
      </div>
      <div className="main__container main__container_color_black">
        <AboutProject/>
      </div>
      <div className="main__container main__container_color_gray">
        <Techs/>
      </div>
      <div className="main__container main__container_color_black">
        <AboutMe/>
        <Portfolio />
      </div>
    </main>
  );
}

export default Main;
