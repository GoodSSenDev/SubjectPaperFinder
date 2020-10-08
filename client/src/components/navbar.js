import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import App from "../App";
import SubmissionPage from "../pages/SubmissionPage";

//Stateless Functional Component
class NavBar extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div>
          <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand">
              SEER <Link to="/">Home</Link>
            </a>

            <Link to="/submission">Submission</Link>
          </nav>
        </div>
        <Switch>
          <Route path="/submission">
            <SubmissionPage />
          </Route>
          {/* <Route path="/">
            <App />
          </Route> */}
        </Switch>
      </Router>
    );
  }
}

export default NavBar;
