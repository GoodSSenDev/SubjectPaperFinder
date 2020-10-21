import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import Axios from "axios";
import React, { Component } from "react";
import { thistle } from "color-name";

class SubmissionPage extends Component {
  state = {
    title: "",
    author: "",
    journal: "",
    date: null,
    extradata: [],
    newkey: "",
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addField = this.addField.bind(this);
  }
  handleSubmit(event) {
    var info = {
      title: this.state.title,
      author: this.state.author,
      journal: this.state.journal,
      date: this.convertDateToShort(this.state.date),
    };

    this.state.extradata.map((el, i) => {
      if (Object.keys(el)[0] != "date")
        info[Object.keys(el)[0]] = el[Object.keys(el)[0]];
    });

    let error = "";
    if (info.title == "") {
      error = "Please enter title";
    } else if (info.author == "") {
      error = "Please enter author";
    }
    if (error != "") {
      window.alert(error);
      return;
    }

    if (info.date == "") info.date = "00/00/0000";

    console.log(info);
    var data = { paper: info };
    Axios.post("/paper/submit-queued-papers", data)
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
    var day = date.getDate().toString();
    var month = (date.getMonth() + 1).toString();
    var year = date.getFullYear().toString();
    return day + "/" + month + "/" + year;
  }

  addField() {
    if (
      this.state.newkey == "" ||
      this.state.newkey.toUpperCase() == "_PID" ||
      this.state.newkey.toUpperCase() == "PID" ||
      this.state.newkey.toUpperCase() == "_ID" ||
      this.state.newkey.toUpperCase() == "ID" ||
      this.state.newkey.toUpperCase() == "DATE" ||
      this.state.newkey.toUpperCase() == "YEAR" ||
      this.state.newkey.toUpperCase() == "MONTH"
    ) {
      window.alert("Invalid Key!");
      return;
    }
    this.setState((prevState) => ({
      extradata: [...prevState.extradata, { [this.state.newkey]: "" }],
    }));
    this.setState({ newkey: "" });
  }

  removeField(i) {
    let fields = [...this.state.extradata];
    fields.splice(i, 1);
    this.setState({ extradata: fields });
  }

  handleExtraDetails(i, e) {
    const { name, value } = e.target;
    let extra = [...this.state.extradata];
    console.log(extra[i]);
    extra[i] = {
      ...extra[i],
      [name]: value,
    };
    console.log(extra[i]);
    this.setState({ extradata: extra });
  }

  renderExtraFields() {
    return this.state.extradata.map((el, i) => (
      <div key={i}>
        <label style={{ marginLeft: "10px" }}>{Object.keys(el)[0]}</label>
        <div />
        <div class="btn-group">
          <input
            name={Object.keys(el)[0]}
            type="text"
            class="form-control"
            placeholder={"Enter " + Object.keys(el)[0]}
            aria-label={"Enter " + Object.keys(el)[0]}
            aria-describedby="basic-addon1"
            value={el[Object.keys(el)[0]]}
            onChange={this.handleExtraDetails.bind(this, i)}
          />
          <button
            style={{
              marginTop: "0px",
            }}
            type="button"
            class="btn btn-outline-none"
            onClick={this.removeField.bind(this, i)}
          >
            <svg
              style={{ marginLeft: "0px", marginTop: "0px" }}
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              class="bi bi-dash-circle-fill"
              fill="#FF5233"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
              />
            </svg>
          </button>
        </div>
      </div>
    ));
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
            placeholder="Enter Title"
            aria-label="Enter Title"
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
            placeholder="Enter Author"
            aria-label="Enter Author"
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
            placeholder="Enter Journal"
            aria-label="Enter Journal"
            aria-describedby="basic-addon1"
            value={this.state.journal}
            onChange={this.handleChange}
          />
          <div style={{ marginTop: "50px", marginBottom: "30px" }}>
            <text>Date Created: </text>
            <DatePicker
              selected={this.state.date}
              onChange={(date) => this.setStartDate(date)}
              isClearable
              placeholderText="Enter From Date"
            />
          </div>
          {this.renderExtraFields()}
        </form>
        <hr
          style={{
            color: "#e6e6e6",
            backgroundColor: "#e6e6e6",
            height: 2,
          }}
        />
        <div class="btn-group" style={{ marginTop: "0px" }}>
          <input
            name="newkey"
            type="text"
            class="form-control"
            placeholder="Enter new key"
            aria-label="Enter new key"
            aria-describedby="basic-addon1"
            value={this.state.newkey}
            onChange={this.handleChange}
          />
          <button
            style={{
              marginTop: "0px",
            }}
            type="button"
            class="btn btn-outline-none"
            onClick={this.addField}
          >
            <svg
              style={{ marginLeft: "0px", marginTop: "0px" }}
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
        </div>

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
