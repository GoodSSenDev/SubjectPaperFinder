import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import Axios from "axios";

import { store } from "../store";
import { setResults } from "../actions";

class MainSearchBar extends Component {
  state = {
    value: "",
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
    this.handlePress = this.handlePress.bind(this);
    this.convertDateToShort();
  }

  componentDidMount() {
    this.searchPaper();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }
  handleClick(event) {
    console.log("handleClick");
    this.searchPaper();
  }
  handlePress(event) {
    if (event.key === "Enter") {
      this.searchPaper();
    }
  }

  searchPaper() {
    var Data = {
      text: this.state.value,
      StartDate: this.convertDateToShort(this.state.StartDate),
      EndDate: this.convertDateToShort(this.state.EndDate),
    };

    let routes = "";

    if (Data.text == "" && (Data.StartDate == "" || Data.EndDate == "")) {
      routes = "get-papers";
    } else if (Data.text == "") {
      routes = "get-date-papers";
    } else if (Data.StartDate == "" || Data.EndDate == "") {
      routes = "get-search-title-papers";
    } else {
      routes = "get-date-search-title-papers";
    }

    Axios.post("/paper/" + routes, Data)
      .then((res) => {
        var results = res.data.papers;
        store.dispatch(setResults(results));
      })
      .catch((err) => {
        console.error(err);
      });

    // Axios.post("/", Data, config)
    //   .then((res) => {
    //     var results = res.data;
    //     console.log(results);
    //     if (Data.StartDate == "" && Data.EndDate == "") {
    //       store.dispatch(setResults(results[0]));
    //     } else {
    //       store.dispatch(setResults(this.GetMatchingResults(results)));
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
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
    var day = date.getDate().toString();
    var month = (date.getMonth() + 1).toString();
    var year = date.getFullYear().toString();
    return day + "/" + month + "/" + year;
  }

  GetMatchingResults(results) {
    let papername = results[0];
    let paperdate = results[1];
    let actual = [];
    var biggerResult;
    var smallerResult;
    if (papername.length > paperdate.length) {
      biggerResult = papername;
      smallerResult = paperdate;
    } else if (papername.length <= paperdate.length) {
      biggerResult = paperdate;
      smallerResult = papername;
    } else {
      return [];
    }
    var i;
    var j;
    for (i = 0; i < biggerResult.length; i++) {
      for (j = 0; j < smallerResult.length; j++) {
        if (
          biggerResult[i].author == smallerResult[j].author &&
          biggerResult[i].title == smallerResult[j].title
        )
          actual.push(smallerResult[j]);
      }
    }
    return actual;
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
            onKeyDown={this.handlePress}
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
