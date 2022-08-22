import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
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
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </ul>
    </nav>
  );
}

export default NavBar;
