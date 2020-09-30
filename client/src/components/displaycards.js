import React, { Component } from "react";
import Card from "./card";

class DisplayCards extends Component {
  state = {
    items: [],
    data: [],
  };
  render() {
    this.items = [];
    this.data = this.props.data;
    console.log(this.data[0]);
    this.items.push(
      this.data.map((elem) => <Card title={elem.title} data={elem} />)
    );
    return <div>{this.items}</div>;
  }

  getState() {
    return this.state;
  }
}

export default DisplayCards;
