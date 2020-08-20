import React, { Component } from "react";
import NavBar from "./components/navbar";
import "./App.css";

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

  connecToServer() {  fetch('/');  }

  componentDidMount() {
    fetch('/data')
      .then((res) => res.json())
      .then((data) => {
        this.counter = (this.counter%data.length)
        if(data[this.counter]!=undefined) {
          this.setState({
            title: data[this.counter][0],
            content: data[this.counter][1]
          })
        }
    })
      // .then((data) => this.setState({ username: data.paper[0]['title'] }));
  }
  

  handleNextTitleButtonClick = () => {
    this.counter += 1
    this.componentDidMount()
  }

  render() {
    const { title, content}  = this.state;
    console.log("App - Rendered");
    return (
      <React.Fragment>
        <NavBar />
        <button onClick={this.handleNextTitleButtonClick}>Go to next title</button>
        <h2>{ `${title}` }</h2>
        <p>{ `${content}` }</p>
      </React.Fragment>
    );
  }
}

export default App;
