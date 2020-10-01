import { title } from "process";
import React, { Component } from "react";
class InputBox extends Component {
  state = { text: "", title: "" };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.setState({ title: this.props.title });
  }
  handleChange(event) {
    this.setState({ text: event.target.value });
  }
  render() {
    return (
      <div
        style={{
          marginLeft: "50px",
          marginRight: "50px",
          marginTop: "20px",
        }}
      >
        <body style={{ marginLeft: "10px", fontWeight: "bold" }}>
          {this.props.title.toUpperCase()}
        </body>
        <input
          style={{
            marginRight: "20px",
            marginleft: "50px",
          }}
          type="text"
          class="form-control"
          placeholder="Enter Text"
          aria-label="Enter Text"
          aria-describedby="basic-addon1"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default InputBox;
