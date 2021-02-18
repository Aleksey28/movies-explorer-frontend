import "./App.css";
import React, { useState } from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="page">
      <Header loggedIn={loggedIn}/>
      <Main/>
    </div>
  );
}

export default App;
