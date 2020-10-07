import React, { Component } from "react";
import NavBar from "./components/navbar";
import MainSearchBar from "./components/mainsearchbar";
import ButtonArrow from "./components/buttonarrow";
import DisplayCards from "./components/displaycards";
import "./App.css";
import TagBox from "./components/tagbox";
import DatePickerCustom from "./components/DatePickerCustom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SubmissionPage from "./pages/SubmissionPage";
import PaperDetails from "./pages/PaperDetails";
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
            <span>
              <Link to="/">Home</Link>
              <span> | </span>
              <Link to="/submission">Submission</Link>
            </span>
          </nav>

          <Switch>
            <Route path="/submission">
              <SubmissionPage />
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
