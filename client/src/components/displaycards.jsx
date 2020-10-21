import React, { Component } from "react";
import Card from "./card";

class DisplayCards extends Component {
  state = {
    items: [],
    data: [],
    type: "",
  };
  render() {
    this.items = [];
    this.data = this.props.data;
    this.type = this.props.type;
    if (this.data instanceof Array && this.type == "card") {
      this.items.push(this.data.map((elem) => <Card data={elem} type="card"/>));
      return <div>{this.items}</div>;
    } else if (this.data instanceof Array){
      this.items.push(this.data.map((elem) => <Card data={elem} type={this.type}/>));
    return <div>{this.items}</div>;
    }else return <div>nothing</div>;
  }
}

export default DisplayCards;
