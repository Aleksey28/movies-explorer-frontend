import "./App.css";
import React, { useState } from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import { Route } from "react-router";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="page">
      <div className={`page__container ${!loggedIn && "page__container_color_blue"}`}>
        <Header loggedIn={loggedIn}/>
        <Route exact path="/">
          <Promo/>
        </Route>
      </div>
      <Main/>
    </div>
  );
}

export default App;
