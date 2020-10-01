import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

class MainSearchBar extends Component {
  state = {
    value: "",
    Controller: this.props.controller,
    StartDate: null,
    EndDate: null,
    startDate: null,
    endDate: null,
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.convertDateToShort();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }
  handleClick(event) {
    var data = {
      value: this.state.value,
      StartDate: this.convertDateToShort(this.state.StartDate),
      EndDate: this.convertDateToShort(this.state.EndDate),
    };
    this.state.Controller.searchPaperName(data);
  }

  setStartDate(date) {
    this.setState({
      StartDate: date,
    });
  }
  setEndDate(date) {
    this.setState({ EndDate: date });
  }

  convertDateToShort(date) {
    if (date == null) return "";
    console.log(date);
    var day = date.getDay().toString();
    var month = date.getMonth().toString();
    var year = date.getFullYear().toString();
    return day + "/" + month + "/" + year;
  }

  render() {
    return (
      <div>
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
        <div style={{ marginLeft: "50px" }}>
          <text>From: </text>
          <DatePicker
            selected={this.state.StartDate}
            onChange={(date) => this.setStartDate(date)}
            isClearable
            placeholderText="Enter From Date"
          />
          <p />
          <text>To: </text>
          <DatePicker
            selected={this.state.EndDate}
            onChange={(date) => this.setEndDate(date)}
            isClearable
            placeholderText="Enter End Date"
          />
        </div>
      </div>
    );
  }
}

export default MainSearchBar;
