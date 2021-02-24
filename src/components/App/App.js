import "./App.css";
import React, { useState } from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import { Route } from "react-router";
import Footer from "../Footer/Footer";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="page">
      <div className={`page__container ${!loggedIn && "page__container_color_blue"}`}>
        <Header loggedIn={loggedIn}/>
      </div>
      <Route exact path="/">
        <Main/>
      </Route>
      <Footer/>
    </div>
  );
}

export default App;
