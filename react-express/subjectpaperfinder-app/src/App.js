import React, { Component } from "react";
import NavBar from "./components/navbar";
import "./App.css";

class App extends Component {
  state = {
    apiResponse: "",
  };

  constructor(props) {
    super(props);
    console.log("App - Constructor");
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    console.log("App - Rendered");
    return (
      <React.Fragment>
        <NavBar />
        <p>{this.state.apiResponse}</p>
      </React.Fragment>
    );
  }
}

export default App;
