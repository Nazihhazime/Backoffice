import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../Services/authService";

function ProtectedRoute({ path, component: Component, render }) {
  return (
    <Route
      path={path}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location.pathname },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;
