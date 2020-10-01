import React, { Component, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
class DatePickerCustom extends Component {
  state = { StartDate: null, EndDate: null };

  setStartDate(date) {
    this.setState({ StartDate: date });
  }
  setEndDate(date) {
    this.setState({ EndDate: date });
  }

  render() {
    return (
      <div style={{ marginLeft: "1200px" }}>
        <text>From: </text>
        <DatePicker
          selected={this.state.StartDate}
          onChange={(date) => this.setStartDate(date)}
          isClearable
          placeholderText="Enter From Date"
        />
        <text style={{ marginLeft: "100px" }}> To: </text>
        <DatePicker
          selected={this.state.EndDate}
          onChange={(date) => this.setEndDate(date)}
          isClearable
          placeholderText="Enter End Date"
        />
      </div>
    );
  }
}

export default DatePickerCustom;
