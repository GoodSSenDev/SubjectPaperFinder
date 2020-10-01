import React, { Component } from "react";

import InputBoxes from "../components/InputBoxes";

class SubmissionPage extends Component {
  state = { InputBoxes: <InputBoxes /> };
  constructor(props) {
    super(props);
  }
  handleSubmit(event) {}

  render() {
    console.log("Submission page - Rendered");
    return (
      <div>
        {this.state.InputBoxes}
        <button
          style={{
            marginLeft: "1900px",
            marginRight: "50px",
            marginTop: "10px",
          }}
          type="button"
          class="btn btn-outline-none"
        >
          <svg
            style={{ marginRight: "0px", marginBottom: "0px" }}
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            class="bi bi-plus-circle-fill"
            fill="#1395f2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
            />
          </svg>
        </button>
        <p />
        <button
          style={{
            marginLeft: "50px",
            marginRight: "50px",
            marginTop: "10px",
          }}
          type="button"
          class="btn btn-primary btn-lg"
        >
          Submit
        </button>
      </div>
    );
  }
}

export default SubmissionPage;
