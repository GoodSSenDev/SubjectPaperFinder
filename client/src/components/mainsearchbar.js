import React, { Component } from "react";

class MainSearchBar extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          marginLeft: "50px",
          marginTop: "50px",
        }}
        class="input-group mb-3"
      >
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            🔎
          </span>
        </div>
        <input
          style={{
            marginRight: "20px",
            marginleft: "50px",
          }}
          type="text"
          class="form-control"
          placeholder="Enter Description"
          aria-label="Enter Description"
          aria-describedby="basic-addon1"
        ></input>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          style={{ marginRight: "100px", marginleft: "100px" }}
        >
          <text style={{ marginRight: "100px", marginleft: "100px" }}>
            Search
          </text>
        </button>
      </div>
    );
  }
}

export default MainSearchBar;
