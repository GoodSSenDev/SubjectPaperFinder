import React, { Component } from "react";
import NavBar from "./components/navbar";
import MainSearchBar from "./components/mainsearchbar";
import ButtonArrow from "./components/buttonarrow";
import DisplayCards from "./components/displaycards";
import "./App.css";
import TagBox from "./components/tagbox";
import DatePickerCustom from "./components/DatePickerCustom";
import ProfileButton from "./components/profilebutton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SubmissionPage from "./pages/SubmissionPage";
import PaperDetails from "./pages/PaperDetails";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/ProfilePage";

import { store } from "./store";
import { setUser } from "./actions";

class App extends Component {
  state = { user: "" };

  renderNavBar() {
    let links = [];

    links.push(
      <a
        href="/"
        class="btn btn-outline-dark"
        role="button"
        aria-pressed="true"
      >
        Home
      </a>
    );
    if (this.state.user == "") {
      links.push(
        <a
          href="/login"
          class="btn btn-outline-dark"
          role="button"
          aria-pressed="true"
        >
          Login
        </a>
      );
    } else {
      links.push(
        <a
          href="/submission"
          class="btn btn-outline-dark"
          role="button"
          aria-pressed="true"
        >
          Submit Paper
        </a>
      );
      links.push(
        <div aria-pressed="true">
          <ProfileButton />
        </div>
      );
    }

    return (
      <span>
        <div class="container">
          <div class="row">
            <div class="col-md-1000">
              <div class="btn-group">{links}</div>
            </div>
          </div>
        </div>
      </span>
    );
  }

  logout() {
    store.dispatch(setUser(""));
  }

  render() {
    console.log("App - Rendered");
    const unsubscribe = store.subscribe(() => {
      console.log("Store changed!", store.getState());
      this.setState({ user: store.getState().user });
    });
    return (
      <Router>
        <div>
          <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">
              SEER
            </a>
            {this.renderNavBar()}
          </nav>

          <Switch>
            <Route path="/submission">
              <SubmissionPage />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/:paper">
              <PaperDetails />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
