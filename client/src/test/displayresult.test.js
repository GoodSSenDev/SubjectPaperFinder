import React from "react";
import ReactDom from "react-dom";
import { render } from "@testing-library/react";
import App from "../App";
import { act } from "react-dom/test-utils";
import { except } from "chai";
import DisplayCards from "../components/displaycards";
import renderer from "react-test-renderer";
const assert = require("assert");

let rootContainer;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer = null;
});

describe("Components Test", function () {
  it("Test if Title is shown", function () {
    act(() => {
      ReactDom.render(<App />, rootContainer);
    });
    const h3 = rootContainer.querySelector("h3").innerHTML;
    assert.equal(h3, "Results");
  });

  it("Renders Correctly", function () {
    let components = null;
    var i;
    var temp = [];
    for (i = 0; i < 10; i++) {
      let data = {
        title: "Title: " + i,
        author: "Yuki",
        journal: "Top 10 Yukis",
      };
      temp.push(data);
    }
    act(() => {
      components = renderer.create(<DisplayCards data={temp} />);
    });
  });

  it("Renders All Data Correctly", function () {
    let components = null;

    var i;
    var dummydata = [];
    for (i = 0; i < 10; i++) {
      let data = {
        title: "Title: " + i,
        author: "Yuki",
        journal: "Top 10 Yukis",
      };
      dummydata.push(data);
    }
    let displaycards = <DisplayCards data={dummydata} />;
    act(() => {
      ReactDom.render(displaycards, rootContainer);
    });
    const value = displaycards.props.data;
    assert.equal(value.length, 10);
  });
});
