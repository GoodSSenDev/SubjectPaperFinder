import React, { Component } from "react";
import Tag from "./tag";

class TagBox extends Component {
  render() {
    return (
      <div
        style={{
          marginLeft: "50px",
          marginTop: "10px",
          marginRight: "50px",
        }}
      >
        <div class="card-header">{this.props.titlename}</div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <Tag />
          </blockquote>
        </div>
      </div>
    );
  }
}

export default TagBox;
