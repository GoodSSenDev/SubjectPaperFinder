import React, { Component } from "react";
import NavBar from "./components/navbar";
import MainSearchBar from "./components/mainsearchbar";
import ButtonArrow from "./components/buttonarrow";
import DisplayCards from "./components/displaycards";
import "./App.css";
import ViewController from "./viewcontroller";
import TagBox from "./components/tagbox";
import DatePickerCustom from "./components/DatePickerCustom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SubmissionPage from "./pages/SubmissionPage";
import Home from "./pages/Home";

class App extends Component {
  state = {};

  render() {
    console.log("App - Rendered");
    return (
      <Router>
        <div>
          <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand">SEER</a>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/submission">Submission</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/submission">
              <SubmissionPage />
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
