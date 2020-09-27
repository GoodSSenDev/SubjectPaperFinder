import React, { Component } from "react";
import Card from "./card";

class DisplayCards extends Component {
  state = {
    items: [],
  };
  render() {
    this.items = [];
    const data = this.props.data;
    this.items.push(
      data.map((elem) => <Card title={elem.title} data={elem} />)
    );
    return <div>{this.items}</div>;
  }

  getState() {
    return this.state;
  }
}

export default DisplayCards;
