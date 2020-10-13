import { store } from "../store";
import Axios from "axios";
import { Redirect } from "react-router-dom";

import React, { Component } from "react";

class PaperDetails extends Component {
  state = {
    displayedPaper: null,
    user: null,
    type: "",
    moved: false,
  };

  constructor(props) {
    super(props);
    this.AcceptPaper = this.AcceptPaper.bind(this);
  }
  componentDidMount() {
    this.setState({ user: store.getState().user });
    const unsubscribe = store.subscribe(() => {
      console.log("Store changed!", store.getState());
      this.setState({ user: store.getState().user });
    });
    let data = window.location.pathname;
    data = data.replace("/", "");
    data = data.split("+");
    this.setState({ type: data[1] });
    const results = store.getState().results;
    const displayedPaper = results.find((result) => result._id === data[0]);

    let items = [];
    for (const key in displayedPaper) {
      items.push(
        <div style={{ marginTop: "20px" }}>
          <h3>{key.toUpperCase()}</h3>
          <p>{displayedPaper[key]}</p>
        </div>
      );
    }
    this.setState({ data: items, displayedPaper: displayedPaper });
  }

  AcceptPaper() {
    if (this.state.displayedPaper == null) return;
    let paper = this.state.displayedPaper;
    const PID = parseInt(this.state.displayedPaper._PId);

    delete paper["_PId"];
    delete paper["_id"];

    let Data = {
      PID: PID,
      paper: paper,
    };

    Axios.post("/paper/accept-queued-paper", Data)
      .then((res) => {
        console.log(res.data);
        window.alert("Paper Accepted!");
        this.setState({ moved: true });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  renderButtons() {
    if (this.state.user != null) {
      if (
        this.state.user.role.toUpperCase() == "MODERATOR" &&
        this.state.type == "submitted"
      )
        return (
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick={this.AcceptPaper}
              href="/"
            >
              Accept
            </button>
            <button
              type="button"
              class="btn btn-danger btn-lg"
              onClick={this.handleSubmit}
            >
              Reject
            </button>
          </div>
        );
      else if (
        (this.state.user.role.toUpperCase() == "MODERATOR" ||
          this.state.user.role.toUpperCase() == "ANALYST") &&
        this.state.type == "accepted"
      )
        return (
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick={this.AcceptPaper}
              href="/"
            >
              Submit
            </button>
          </div>
        );
    } else return <span />;
  }

  render() {
    const { user, type, data, moved } = this.state;
    if (moved) return <Redirect to="/" />;
    return (
      <div style={{ marginLeft: "100px", marginTop: "50px" }}>
        {this.state.data}
        {this.renderButtons()}
      </div>
    );
  }
}

export default PaperDetails;
