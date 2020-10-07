import store from "../store";

import React, { Component } from "react";

class PaperDetails extends Component {
  state = {
    data: [],
  };

  DisplayDetails() {}
  componentDidMount() {
    let data = window.location.pathname;
    data = data.replace("/", "");
    const results = store.getState().results;
    const displayedResult = results.find((result) => result._id === data);

    let items = [];
    for (const key in displayedResult) {
      items.push(
        <div style={{ marginTop: "20px" }}>
          <h3>{key.toUpperCase()}</h3>
          <p>{displayedResult[key]}</p>
        </div>
      );
    }
    this.setState({ data: items });
  }
  render() {
    return (
      <div style={{ marginLeft: "100px", marginTop: "50px" }}>
        {this.state.data}
      </div>
    );
  }
}

export default PaperDetails;
