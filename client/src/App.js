import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import MainSearchBar from "./components/mainsearchbar";
import TagBox from "./components/tagbox";
import DropDown from "./components/dropdown";
import Card from "./components/card";
import ButtonArrow from "./components/buttonarrow";
import DisplayCards from "./components/displaycards";
import "./App.css";
import api from "./api";
import mainsearchbar from "./components/mainsearchbar";

import axios from "axios";

//import logo from "./logo.svg";

class App extends Component {
  state = {
    title: null,
    author: null,
    journal: null,
    results: [],
    apiResponse: "nothing",
  };

  //code for package json scripts
  //"start": "react-scripts start",
  constructor(props) {
    super(props);
    console.log("App - Constructor");
    this.counter = 0;
  }

  connecToServer() {
    fetch("/");
  }

  callAPI() {
    // axios
    //   .post("http://localhost:5000/api", "most")
    //   .then(() => console.log("Made request"));
    fetch("http://localhost:5000/api")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentDidMount = async () => {
    // fetch("/data")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.counter =
    //       ((this.counter % data.length) + data.length) % data.length;
    //     if (data[this.counter] != undefined) {
    //       this.setState({
    //         title: data[this.counter][0],
    //         author: data[this.counter][1],
    //         journal: data[this.counter][2],
    //       });
    //     }
    //   });
    // // .then((data) => this.setState({ username: data.paper[0]['title'] }));

    this.callAPI();
  };

  handleNextTitleButtonClick = () => {
    this.counter += 1;
    this.componentDidMount();
  };

  handlePreviousTitleButtonClick = () => {
    this.counter -= 1;
    this.componentDidMount();
  };

  render() {
    const { title, author, journal, results } = this.state;
    console.log("App - Rendered");
    return (
      <Router>
        <React.Fragment>
          <NavBar />
          <p>{this.state.apiResponse}</p>
          <MainSearchBar />
          <TagBox titlename={"ADD TAGS"} />
          <TagBox titlename={"IGNORE TAGS"} />
          <TagBox titlename={"Refine Search"} />
          <h3 style={{ marginLeft: "10px" }}>Results</h3>
          <hr
            style={{
              color: "#e6e6e6",
              backgroundColor: "#e6e6e6",
              height: 2,
            }}
          />
          <p style={{ marginLeft: "10px" }}>
            Showing {results.length} Results:
          </p>
          <DisplayCards data={results} />

          <ButtonArrow
            buttonmethod={this.handlePreviousTitleButtonClick}
            arrow={"bi bi-arrow-left-circle-fill"}
            d={
              "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z"
            }
          />
          <ButtonArrow
            buttonmethod={this.handleNextTitleButtonClick}
            arrow={"bi bi-arrow-right-circle-fill"}
            d={
              "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-11.5.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z"
            }
          />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
