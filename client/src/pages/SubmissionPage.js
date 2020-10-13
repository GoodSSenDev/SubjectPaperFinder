import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import Axios from "axios";
import React, { Component } from "react";

class SubmissionPage extends Component {
  state = { title: "", author: "", journal: "", date: null };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    var data = this.state;
    data.date = this.convertDateToShort(data.date);
    let config = {
      headers: {
        title: "Submit_Paper",
      },
    };
    Axios.post("/", data, config)
      .then((res) => {
        console.log("Submission Sent!");
      })
      .catch((err) => {
        console.error(err);
      });
    window.alert("Submission Sent! :3");
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  setStartDate(date) {
    this.setState({
      date: date,
    });
  }

  convertDateToShort(date) {
    if (date == null) return "";
    var day = date.getDay().toString();
    var month = date.getMonth().toString();
    var year = date.getFullYear().toString();
    return day + "/" + month + "/" + year;
  }

  render() {
    console.log("Submission page - Rendered");
    return (
      <div style={{ marginLeft: "50px", marginRight: "50px" }}>
        <form>
          <label style={{ marginLeft: "10px" }}>Title</label>
          <input
            name="title"
            type="text"
            class="form-control"
            placeholder="Enter Text"
            aria-label="Enter Text"
            aria-describedby="basic-addon1"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <p />
          <label style={{ marginLeft: "10px" }}>Author</label>
          <input
            name="author"
            type="text"
            class="form-control"
            placeholder="Enter Text"
            aria-label="Enter Text"
            aria-describedby="basic-addon1"
            value={this.state.author}
            onChange={this.handleChange}
          />
          <p />
          <label style={{ marginLeft: "10px" }}>Journal</label>
          <input
            name="journal"
            type="text"
            class="form-control"
            placeholder="Enter Text"
            aria-label="Enter Text"
            aria-describedby="basic-addon1"
            value={this.state.journal}
            onChange={this.handleChange}
          />
          <div style={{ marginTop: "50px" }}>
            <text>Date Created: </text>
            <DatePicker
              selected={this.state.date}
              onChange={(date) => this.setStartDate(date)}
              isClearable
              placeholderText="Enter From Date"
            />
          </div>
        </form>
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
            marginTop: "10px",
          }}
          type="button"
          class="btn btn-primary btn-lg"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default SubmissionPage;
