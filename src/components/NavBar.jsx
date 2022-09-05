import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ user }) {
  console.log("user", user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ms-3">
      <NavLink className="navbar-brand" to="/foods">
        Intensive Foods
      </NavLink>
      <ul className="navbar-nav mr-auto">
        <NavLink className="nav-link" to="/foods">
          Foods
        </NavLink>

        <NavLink className="nav-link" to="/customers">
          Customers
        </NavLink>

        <NavLink className="nav-link" to="/orders">
          Orders
        </NavLink>
        {!user && (
          <>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink className="nav-link" to="/profile">
              {user.name}
            </NavLink>
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
