import React, { Component } from "react";

//Stateless Functional Component
const NavBar = ({ totalCounters }) => {
  console.log("NavBar - Rendered");

  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar{" "}
        <span className="badge badge-pill secondary">{totalCounters}</span>
      </a>
    </nav>
  );
};

//sfc + tab -> creates a template for stateless functional component

export default NavBar;
