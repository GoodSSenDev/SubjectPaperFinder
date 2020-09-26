import React, { Component } from "react";
class ButtonArrow extends Component {
  state = {};
  render() {
    return (
      <button
        onClick={this.props.buttonmethod}
        type="button"
        class="btn btn-primary"
        style={{ marginRight: "10px", marginLeft: "20px" }}
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class={this.props.arrow}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill-rule="evenodd" d={this.props.d} />
        </svg>
      </button>
    );
  }
}

export default ButtonArrow;
