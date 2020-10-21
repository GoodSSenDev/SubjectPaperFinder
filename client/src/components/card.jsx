import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PaperDetails from "../pages/PaperDetails";
import SubmissionPage from "../pages/SubmissionPage";
class Card extends Component {
  state = {};
  render() {
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
              <Link
                to={{
                  pathname: `${data._id}+${this.props.type}`,
                }}
                style={{ fontSize: "20px" }}
              >
                {title}
              </Link>
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
