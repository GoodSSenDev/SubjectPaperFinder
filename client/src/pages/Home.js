import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../components/navbar";
import MainSearchBar from "../components/mainsearchbar";
import ButtonArrow from "../components/buttonarrow";
import DisplayCards from "../components/displaycards";
import "../App.css";
import TagBox from "../components/tagbox";
import DatePickerCustom from "../components/DatePickerCustom";
import DropDownSort from "../components/dropdownSort";

import {store} from "../store";
import { setResults } from "../actions";

class Home extends Component {
  state = {
    results: [],
    searchfield: null,
  };

  componentDidMount = async () => {
    this.setState({
      searchfield: <MainSearchBar />,
    });

    const unsubscribe = store.subscribe(() => {
      console.log("Store changed!", store.getState());
      this.setState({ results: store.getState().results });
    });
  };

  render() {
    const { results, searchfield } = this.state;

    console.log("Home page - Rendered");
    return (
      <React.Fragment>
        {searchfield}
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
        <DropDownSort />

        <DisplayCards data={results} />
      </React.Fragment>
    );
  }
}

export default Home;
