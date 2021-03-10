import { Redirect, Route } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children, ...props }) => {
  return (
    <Route>
      {
        () => props.loggedIn ? children : <Redirect to="/signin"/>
      }
    </Route>
  );
};

export default ProtectedRoute;
