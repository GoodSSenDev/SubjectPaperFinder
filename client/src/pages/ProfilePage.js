import React, { Component } from "react";
import { store } from "../store";

import Axios from "axios";

class Profile extends Component {
  state = {
    profile: null,
    user: "",
  };

  constructor(props) {
    super(props);
    const unsubscribe = store.subscribe(() => {
      console.log("Store changed!", store.getState());
      this.setState({ user: store.getState().user });
      if (this.state.user != "") {
        console.log("hmm");
        this.renderProfile();
      }
    });
  }

  renderProfile() {
    let data = {
      username: this.state.user,
    };
    Axios.post("/account/profile", data)
      .then((res) => {
        this.setState({ profile: res.data.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {}
  render() {
    if (this.state.profile == null) return <div></div>;
    return (
      <div style={{ marginLeft: "100px", marginTop: "50px" }}>
        <div>
          <h1 class="display-4">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-person-circle"
              fill="currentcolor"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "10px" }}
            >
              <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
              <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path
                fill-rule="evenodd"
                d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
              />
            </svg>
            {this.state.profile.username}
          </h1>
          <p class="lead">role: {this.state.profile.role.toUpperCase()}</p>
          <hr class="my-4" />
          <p style={{ fontWeight: "bold" }}>
            Email:<body>{this.state.profile.email}</body>
          </p>
          <a class="btn btn-danger btn-lg" href="#" role="button">
            Delete Account
          </a>
        </div>
      </div>
    );
  }
}

export default Profile;
