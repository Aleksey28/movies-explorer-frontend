import "./App.css";
import React, { useState } from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import { Route, Switch } from "react-router";
import Footer from "../Footer/Footer";
import Error from "../Error/Error";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="page">
      <Switch>
        <Route path="/error">
          <Error/>
        </Route>
        <Route path="/">
          <div className={`page__container ${!loggedIn && "page__container_color_blue"}`}>
            <Header loggedIn={loggedIn}/>
          </div>
          <Route exact path="/">
            <Main/>
            <Footer/>
          </Route>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
