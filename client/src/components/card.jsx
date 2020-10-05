import React, { Component } from "react";

class Card extends Component {
  state = {};
  render() {
    const items = [];
    const data = this.props.data;
    let title;
    let date;
    let author = "N/A";
    if (data.author != undefined) author = data.author;
    if (data.date != undefined) {
      if (data.date == "00/00/0000") date = "N/A";
      else date = data.date;
    }

    if (data.title != undefined) {
      title = data.title;
      title = title.replace(/[^\w\s]/gi, "");
    }

    // for (const [key, value] of Object.entries(data)) {
    //   if (key != "title")
    //     items.push(
    //       <div>
    //         <text style={{ fontWeight: "bold" }}>
    //           {key.toUpperCase()} <body>{value}</body>
    //         </text>
    //       </div>
    //     );
    // }
    return (
      <div
        class="card shadow-sm mb-3"
        style={{ maxwidth: "200px", marginRight: "20px", marginLeft: "20px" }}
      >
        <body
          class="shadow-none p-2 bg-light rounded"
          style={{ textAlign: "right", color: "#8f8f8f" }}
        >
          {date}
        </body>
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
              <h5
                class="card-title"
                style={{ color: "#4f8ae8" }}
              >{`${title}`}</h5>
              <p>
                <span class="font-weight-bold">Author: </span>
                {author}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
