import {store} from "../store";
import { setUser } from "../actions";

import Axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";


class SignUp extends Component {
  state = {
    username: "",
    password: "",
    password2: "",
    email: "",
    success: false,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

      if(!this.checkSamePassword(this.state.password,this.state.password2)){
        window.alert("Password don't match!");
        return;
      }
      var data = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        role: "user"
      }
      //console.log(data);
      Axios.post("/account/signup", data)
      .then((res) => {
        console.log(res);
        switch(res.data.code){
          case(0):
            window.alert(res.data.error);
            break;
          case(1):
            window.alert("Successfully Signed Up! :3");
            store.dispatch(setUser(this.state.username))
            this.setState({success: true});
            break;
          case(2):
            window.alert(res.data.error);
            break;
          case(3):
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

  checkSamePassword(p1,p2){
    if(p1 != p2)return false;
    else return true;
  }

  render() {
    if(this.state.success) return <Redirect to="/"/>
    return (
      <form>
        <div style={{ marginLeft: "100px", marginTop: "100px" }}>
          <h1 style={{ marginBottom: "50px" }}>SIGN UP TO SEER</h1>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Email
              </span>
            </div>
            <input
              type="text"
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
              class="form-control"
              placeholder="Enter Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              style={{ marginRight: "100px" }}
            />
          </div>
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
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Re-Enter Password
              </span>
            </div>
            <input
              type="password"
              name="password"
              value={this.state.password2}
              onChange={(event) =>
                this.setState({ password2: event.target.value })
              }
              class="form-control"
              placeholder="Enter Password"
              aria-label="password"
              aria-describedby="basic-addon1"
              style={{ marginRight: "100px" }}
            />
          </div>
        </div>
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

export default SignUp;
