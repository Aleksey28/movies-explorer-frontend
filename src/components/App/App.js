import "./App.css";
import React, { useState } from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import { Route } from "react-router";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className={`page ${!loggedIn && "page_bg_blue"}`}>
      <Header loggedIn={loggedIn}/>
      <Route exact path="/">
        <Main/>
      </Route>
    </div>
  );
}

export default App;
