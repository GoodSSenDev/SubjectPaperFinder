import React, { Component } from "react";

class MainSearchBar extends Component {
  state = { value: "", Controller: this.props.controller };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }
  handleClick(event) {
    this.state.Controller.searchPaperName(this.state.value);
  }

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
          value={this.state.value}
          onChange={this.handleChange}
        ></input>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          style={{ marginRight: "100px", marginleft: "100px" }}
          onClick={this.handleClick}
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
