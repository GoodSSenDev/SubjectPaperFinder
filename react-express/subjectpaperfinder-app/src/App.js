import React, { Component } from "react";
import NavBar from "./components/navbar";
import "./App.css";

class App extends Component {
  state = {
    apiResponse: "",
    username: null,
  };

  constructor(props) {
    super(props);
    console.log("App - Constructor");
  }

  callAPI() {}

  componentDidMount() {
    fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((data) => this.setState({ username: data.username }));
  }

  render() {
    const { username } = this.state;
    console.log("App - Rendered");
    return (
      <React.Fragment>
        <NavBar />
        <p>{username ? `Hello ${username}` : "Hello World"}</p>
      </React.Fragment>
    );
  }
}

export default App;
