import React, { Component } from "react";

import seerlogo from "./seerlogo.png";

import "./App.css";
import ProfileButton from "./components/profilebutton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SubmissionPage from "./pages/SubmissionPage";
import PaperDetails from "./pages/PaperDetails";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/ProfilePage";
import SubmittedPaperQue from "./pages/SubmittedPaperQue";
import AcceptedPaperQue from "./pages/AcceptedPaperQue";

import { store } from "./store";
import { setUser } from "./actions";

class App extends Component {
  state = {
    user: null,
  };

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
    if (this.state.user == null) {
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
      if (this.state.user.role == "MODERATOR") {
        links.push(
          <a
            href="/rejectedpapers"
            class="btn btn-outline-dark"
            role="button"
            aria-pressed="true"
          >
            View Rejected Papers
          </a>
        );
        links.push(
          <a
            href="/submittedpapers"
            class="btn btn-outline-dark"
            role="button"
            aria-pressed="true"
          >
            View Submitted Papers
          </a>
        );
      }
      if (
        this.state.user.role == "MODERATOR" ||
        this.state.user.role == "ANALYST"
      ) {
        links.push(
          <a
            href="/acceptedpapers"
            class="btn btn-outline-dark"
            role="button"
            aria-pressed="true"
          >
            View Accepted Papers
          </a>
        );
      }
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

    return <div class="btn-group">{links}</div>;
  }

  logout() {
    store.dispatch(setUser(""));
  }

  renderRoutes() {
    if (this.state.user == null)
      return (
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/:paper">
            <PaperDetails />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      );
    else if (this.state.user.role.toUpperCase() == "USER")
      return (
        <Switch>
          <Route path="/submission">
            <SubmissionPage />
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
      );
    else if (this.state.user.role.toUpperCase() == "ANALYST")
      return (
        <Switch>
          <Route path="/acceptedpaper">
            <AcceptedPaperQue />
          </Route>
          <Route path="/submission">
            <SubmissionPage />
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
      );
    else if (this.state.user.role.toUpperCase() == "MODERATOR")
      return (
        <Switch>
          <Route path="/acceptedpaper">
            <AcceptedPaperQue />
          </Route>
          <Route path="/submittedpapers">
            <SubmittedPaperQue />
          </Route>
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
      );
  }

  render() {
    // console.log("App - Rendered");
    const unsubscribe = store.subscribe(() => {
      //console.log("Store changed!", store.getState());
      this.setState({ user: store.getState().user });
    });
    return (
      <Router>
        <div>
          <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">
              <img src={seerlogo} alt="SEER"></img>
            </a>
            {this.renderNavBar()}
          </nav>
          <Switch>
            <Route path="/rejectedpapers">
              <SubmittedPaperQue type="rejected" />
            </Route>
            <Route path="/acceptedpapers">
              <SubmittedPaperQue type="accepted" />
            </Route>
            <Route path="/submittedpapers">
              <SubmittedPaperQue type="submitted" />
            </Route>
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
