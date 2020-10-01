import React, { Component } from "react";
import InputBox from "../components/InputBox";
class InputBoxes extends Component {
  state = { InputBoxes: [] };
  RequiredText() {
    this.state.InputBoxes.push(<InputBox title={"Title"} />);
    this.state.InputBoxes.push(<InputBox title={"AUTHOR"} />);
    this.state.InputBoxes.push(<InputBox title={"JOURNAL"} />);
  }
  render() {
    this.RequiredText();
    return <div>{this.state.InputBoxes}</div>;
  }
}

export default InputBoxes;
