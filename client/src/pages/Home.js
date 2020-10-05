import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../components/navbar";
import MainSearchBar from "../components/mainsearchbar";
import ButtonArrow from "../components/buttonarrow";
import DisplayCards from "../components/displaycards";
import "../App.css";
import ViewController from "../viewcontroller";
import TagBox from "../components/tagbox";
import DatePickerCustom from "../components/DatePickerCustom";

class Home extends Component {
  state = {
    results: [],
    Controller: new ViewController(this),
    searchfield: null,
  };

  componentDidMount = async () => {
    this.setState({
      searchfield: <MainSearchBar controller={this.state.Controller} />,
    });
    this.state.Controller.searchPaperName({
      value: "",
      StartDate: "",
      EndDate: "",
    });
  };

  render() {
    const { results, searchfield } = this.state;
    console.log("Home page - Rendered");
    return (
      <React.Fragment>
        {searchfield}
        {/* <DatePickerCustom /> */}
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
        <p style={{ marginLeft: "10px" }}>Showing {results.length} Results:</p>
        <DisplayCards data={results} />
      </React.Fragment>
    );
  }
}

export default Home;
