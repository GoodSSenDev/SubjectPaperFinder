import React, { Component } from "react";
import NavBar from "./components/navbar";
import MainSearchBar from "./components/mainsearchbar";
import TagBox from "./components/tagbox";
import DropDown from "./components/dropdown";

import logo from "./logo.svg";

import "./App.css";
import mainsearchbar from "./components/mainsearchbar";

class App extends Component {
  state = {
    title: null,
    content: null,
  };

  constructor(props) {
    super(props);
    console.log("App - Constructor");
    this.counter = 0;
  }

  connecToServer() {
    fetch("/");
  }

  componentDidMount() {
    fetch("/data")
      .then((res) => res.json())
      .then((data) => {
        this.counter =
          ((this.counter % data.length) + data.length) % data.length;
        if (data[this.counter] != undefined) {
          this.setState({
            title: data[this.counter][0],
            content: data[this.counter][1],
          });
        }
      });
    // .then((data) => this.setState({ username: data.paper[0]['title'] }));
  }

  handleNextTitleButtonClick = () => {
    this.counter += 1;
    this.componentDidMount();
  };

  handlePreviousTitleButtonClick = () => {
    this.counter -= 1;
    this.componentDidMount();
  };

  render() {
    const { title, content } = this.state;
    console.log("App - Rendered");
    return (
      <React.Fragment>
        <NavBar />
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

        <div
          class="card mb-3"
          style={{ maxwidth: "200px", marginRight: "20px", marginLeft: "20px" }}
        >
          <div class="row no-gutters">
            <div class="col-md-4"></div>
            <vl
              style={{
                color: "#e6e6e6",
                backgroundColor: "#e6e6e6",
                height: 10,
                marginRight: "50px",
              }}
            />
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{`${title}`}</h5>
                <p class="card-text">{`${content}`}</p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={this.handlePreviousTitleButtonClick}
          type="button"
          class="btn btn-primary"
          style={{ marginRight: "10px", marginLeft: "20px" }}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-arrow-left-circle-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z"
            />
          </svg>
        </button>
        <button
          onClick={this.handleNextTitleButtonClick}
          type="button"
          class="btn btn-primary"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-arrow-right-circle-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-11.5.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z"
            />
          </svg>
        </button>
        <p></p>
      </React.Fragment>
    );
  }
}

export default App;
