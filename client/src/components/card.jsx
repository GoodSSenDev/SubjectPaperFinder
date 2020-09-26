import React, { Component } from "react";
class Card extends Component {
  state = {};
  render() {
    return (
      <div
        class="card mb-3"
        style={{ maxwidth: "200px", marginRight: "20px", marginLeft: "20px" }}
      >
        <div class="row no-gutters">
          <div class="col-md-4"></div>
          <vl
            style={{
              color: "#e6e6e6",
              backgroundColor: "#e6e6e6",
              height: 10,
              marginRight: "50px",
            }}
          />
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{`${this.props.title}`}</h5>
              <p class="card-text">{`${this.props.content}`}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
