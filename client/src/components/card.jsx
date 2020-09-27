import React, { Component } from "react";
class Card extends Component {
  state = {};
  render() {
    const items = [];
    const data = this.props.data;
    for (const [key, value] of Object.entries(data)) {
      if (key != "title")
        items.push(
          <body>
            {key.toUpperCase()}: {value}
          </body>
        );
    }
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
              {items}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
