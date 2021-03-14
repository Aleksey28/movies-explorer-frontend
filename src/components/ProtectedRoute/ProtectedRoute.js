import { Redirect, Route } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children, condition, to }) => {
  return (
    <Route>
      {
        () => condition ? children : <Redirect to={to}/>
      }
    </Route>
  );
};

export default ProtectedRoute;
