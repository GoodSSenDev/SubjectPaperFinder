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
    if (this.data instanceof Array) {
      this.items.push(this.data.map((elem) => <Card data={elem} />));
      return <div>{this.items}</div>;
    } else return <div>nothing</div>;
  }
}

export default DisplayCards;
