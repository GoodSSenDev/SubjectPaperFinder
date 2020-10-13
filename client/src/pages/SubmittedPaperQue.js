import React, { Component } from "react";
import DisplayCards from "../components/displaycards";

import Axios from "axios";
import { store } from "../store";
import { setResults } from "../actions";

class SubmittedPaperQue extends Component {
  state = { results: [], type: "" };

  componentDidMount = async () => {
    const unsubscribe = store.subscribe(() => {
      console.log("Store changed!", store.getState());
      this.setState({ results: store.getState().results });
    });
    this.setState({ type: this.props.type });
    if (this.props.type == "submitted")
      return this.searchPaper("get-queued-papers");
    else if (this.props.type == "accepted")
      return this.searchPaper("get-accepted-papers");
  };

  searchPaper(action) {
    console.log("action");
    Axios.post("/paper/" + action)
      .then((res) => {
        var results = res.data.papers;
        store.dispatch(setResults(results));
      })
      .catch((err) => {
        console.error(err);
      });
  }
  renderTitle() {
    if (this.state.type == "submitted")
      return (
        <h1 style={{ marginBottom: "30px" }}>
          Submitted papers waiting for approval
        </h1>
      );
    else
      return (
        <h1 style={{ marginBottom: "30px" }}>
          Accepted papers waiting for approval
        </h1>
      );
  }

  render() {
    const { results, type } = this.state;
    if (results == []) return <div>Submited Paper Queue</div>;
    return (
      <div style={{ marginTop: "30px", marginLeft: "30px" }}>
        <h1 style={{ marginBottom: "30px" }}>
          Submitted papers waiting for approval
        </h1>
        <hr
          style={{
            color: "#e6e6e6",
            backgroundColor: "#e6e6e6",
            height: 2,
          }}
        />
        <p style={{ marginLeft: "10px" }}>Showing {results.length} Results:</p>
        <DisplayCards data={results} type={type} />
      </div>
    );
  }
}

export default SubmittedPaperQue;
