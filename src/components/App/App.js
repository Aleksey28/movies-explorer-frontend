import "./App.css";
import React, { useState } from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import { Route } from "react-router";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="page">
      <div className={`page__container ${!loggedIn && "page__container_color_blue"}`}>
        <Header loggedIn={loggedIn}/>
      </div>
      <Route exact path="/">
        <div className="page__container page__container_color_blue">
          <Promo/>
        </div>
        <div className="page__container page__container_color_black">
          <AboutProject/>
        </div>
        <div className="page__container page__container_color_gray">
          <Techs/>
        </div>
      </Route>
      <Main/>
    </div>
  );
}

export default App;
