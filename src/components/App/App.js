import "./App.css";
import React, { useState } from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import { Route, Switch, useLocation } from "react-router";
import Footer from "../Footer/Footer";
import Error from "../Error/Error";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import { cards } from "../../utils/constants";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const {pathname} = useLocation();

  const handleSignIn = () => {
    setLoggedIn(true);
  }

  const handleSignOut = () => {
    setLoggedIn(false);
  }

  return (
    <div className="page">
      <Switch>
        <Route path="/error">
          <Error/>
        </Route>
        <Route path="/signin">
          <Login onSignIn={handleSignIn}/>
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
        <Route path="/">
          <div className={`page__container ${pathname === '/' && "page__container_color_blue"}`}>
            <Header loggedIn={loggedIn}/>
          </div>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route path="/movies">
            <Movies cards={cards}/>
          </Route>
          <Route path="/saved-movies">
            <Movies cards={cards.filter(item => item.saved)}/>
          </Route>
          <Route path="/profile">
            <Profile onSignOut={handleSignOut}/>
          </Route>
          <Switch>
            <Route path="/profile"/>
            <Route path="/">
              <Footer/>
            </Route>
          </Switch>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
