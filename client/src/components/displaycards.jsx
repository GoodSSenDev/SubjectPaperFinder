import React, { Component } from "react";
import Card from "./card";

class DisplayCards extends Component {
  state = {};
  render() {
    const items = [];
    const data = this.props.data;
    var i;
    for (i = 0; i < data.length; i++) {
      items.push(<Card title={data[i].title} data={data[i]} />);
    }

    return <div>{items}</div>;
  }
}

export default DisplayCards;
