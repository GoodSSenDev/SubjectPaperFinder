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

        {/* <ButtonArrow
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
          /> */}
      </React.Fragment>
    );
  }
}

export default Home;
