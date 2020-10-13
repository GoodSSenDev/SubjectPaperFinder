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
    this.AnalystAcceptPaper = this.AnalystAcceptPaper.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  AnalystAcceptPaper() {
    if (this.state.displayedPaper == null) return;
    let paper = this.state.displayedPaper;
    const PID = parseInt(this.state.displayedPaper._PId);

    delete paper["_PId"];
    delete paper["_id"];

    let Data = {
      PID: PID,
      paper: paper,
    };

    Axios.post("/paper/accept-accepted-paper", Data)
      .then((res) => {
        console.log(res.data);
        window.alert("Paper Accepted into the SEER Database");
        this.setState({ moved: true });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleChange(event, id) {
    const val = event;
    const key = id;

    this.setState(
      (prevState) => {
        const { displayedPaper } = prevState;
        displayedPaper[key] = val;
        return { displayedPaper };
      },
      () => {
        console.log(this.state);
      }
    );
  }
  renderData() {
    let items = [];
    console.log("render data");
    for (const key in this.state.displayedPaper) {
      if (key == "_id" || key == "_PId") {
        items.push(
          <div style={{ marginTop: "20px" }}>
            <h3>{key.toUpperCase()}</h3>
            <input
              value={this.state.displayedPaper[key]}
              disabled={true}
              onChange={(e) => this.handleChange(e.target.value, key)}
              type="email"
              class="form-control"
              style={{ marginRight: "100px" }}
            />
          </div>
        );
      } else {
        items.push(
          <div style={{ marginTop: "20px" }}>
            <h3>{key.toUpperCase()}</h3>
            <input
              id={key}
              value={this.state.displayedPaper[key]}
              onChange={(e) => this.handleChange(e.target.value, key)}
              type="email"
              class="form-control"
              disabled={false}
              style={{ marginRight: "100px" }}
            />
          </div>
        );
      }
    }
    return items;
  }

  renderButtons() {
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
            onClick={this.AnalystAcceptPaper}
            href="/"
          >
            Submit
          </button>
        </div>
      );
  }

  render() {
    const { moved, user, type } = this.state;
    if (moved) return <Redirect to="/" />;
    if (user != null && type != "card") {
      return (
        <div
          style={{
            marginLeft: "100px",
            marginTop: "50px",
            marginRight: "100px",
          }}
        >
          {this.renderData()}
          <p />
          {this.renderButtons()}
        </div>
      );
    } else {
      return (
        <div style={{ marginLeft: "100px", marginTop: "50px" }}>
          {this.state.data}
        </div>
      );
    }
  }
}

export default PaperDetails;
