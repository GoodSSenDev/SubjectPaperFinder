import React, { Component } from "react";

//Stateless Functional Component
class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand">SEER</a>
        <form class="form-inline">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </nav>
    );
  }
}

export default NavBar;
