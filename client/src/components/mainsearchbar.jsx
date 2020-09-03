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
            marginRight: "100px",
          }}
          type="text"
          class="form-control"
          placeholder="Enter Description"
          aria-label="Enter Description"
          aria-describedby="basic-addon1"
        ></input>
      </div>
    );
  }
}

export default MainSearchBar;
