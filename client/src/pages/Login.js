import { store } from "../store";
import { setUser } from "../actions";

import Axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    success: false,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    var data = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log(data);
    Axios.post("/account/signin", data)
      .then((res) => {
        console.log(res);
        switch (res.data.code) {
          case 0:
            window.alert(res.data.error);
            break;
          case 1:
            window.alert("Welcome Back! :3");
            store.dispatch(setUser(this.state.username));
            this.setState({ success: true });
            break;
          case 2:
            window.alert(res.data.error);
            break;
          default:
            window.alert(res.data.error);
            break;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    if (this.state.success) return <Redirect to="/" />;
    return (
      <form>
        <div style={{ marginLeft: "100px", marginTop: "100px" }}>
          <h1 style={{ marginBottom: "50px" }}>LOGIN TO SEER</h1>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Username
              </span>
            </div>
            <input
              type="text"
              value={this.state.username}
              onChange={(event) =>
                this.setState({ username: event.target.value })
              }
              class="form-control"
              placeholder="Enter Username"
              aria-label="username"
              aria-describedby="basic-addon1"
              style={{ marginRight: "100px" }}
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Password
              </span>
            </div>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
              class="form-control"
              placeholder="Enter Password"
              aria-label="password"
              aria-describedby="basic-addon1"
              style={{ marginRight: "100px" }}
            />
          </div>
        </div>
        <p style={{ marginLeft: "100px" }}>
          <a href="/signup"> Don't Have an account? click here! </a>
        </p>

        <button
          type="button"
          class="btn btn-primary btn-lg"
          style={{ marginLeft: "100px", marginTop: "30px" }}
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default Login;
