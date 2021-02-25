import "./App.css";
import React, { useState } from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import { Route, Switch } from "react-router";
import Footer from "../Footer/Footer";
import Error from "../Error/Error";
import Login from "../Login/Login";
import Register from "../Register/Register";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="page">
      <Switch>
        <Route path="/error">
          <Error/>
        </Route>
        <Route path="/signin">
          <Login/>
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
        <Route path="/">
          <div className={`page__container ${!loggedIn && "page__container_color_blue"}`}>
            <Header loggedIn={loggedIn}/>
          </div>
          <Route exact path="/">
            <Main/>
          </Route>
          <Footer/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
