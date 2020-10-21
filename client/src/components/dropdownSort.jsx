import React, { Component } from "react";

import {store} from "../store";
import { setResults, setSort } from "../actions";

class DropDownSort extends Component {
  state = { value: "none" };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    store.dispatch(setSort(event.target.value));
    store.dispatch(setResults(store.getState().results));
  }
  render() {
    return (
      <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="none">No Sort</option>
          <option value="ascending">Ascending Date</option>
          <option value="descending">Descending Date</option>
        </select>
      </div>
    );
  }
}

export default DropDownSort;
