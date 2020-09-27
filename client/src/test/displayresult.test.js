import React from "react";
import ReactDom from "react-dom";
import { render } from "@testing-library/react";
import App from "../App";
import { act } from "react-dom/test-utils";
import { except } from "chai";
const assert = require("assert");

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// var jsdom = require("mocha-jsdom");

// global.document = jsdom({
//   url: "http://localhost:3000/",
// });

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

  it("Test if results are shown", function () {
    act(() => {
      ReactDom.render(<App />, rootContainer);
    });
    const h3 = rootContainer.querySelector("h3").innerHTML;
    assert.equal(h3, "Results");
  });
});
