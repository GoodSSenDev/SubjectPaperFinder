import React from "react";
import ReactDom from "react-dom";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { except } from "chai";
import renderer from "react-test-renderer";
import PaperDetails from "../pages/PaperDetails";

import { store } from "../store";
import { setResults } from "../actions";

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

describe("Result Page display Tests", function () {
  it("Renders Correctly", function () {
    act(() => {
      renderer.create(<PaperDetails />);
    });
  });

  it("Get Amount of Results", function () {
    let dummyArray = [
      { year: 2016, month: "mar", date: "00/03/2016" },
      { year: 2018, date: "00/00/2018" },
      { year: 2018, month: "aug", date: "00/08/2018" },
      { year: 2018, month: "aug", day: "08", date: "08/08/2018" },
      { year: 2006, date: "00/00/2006" },
      { year: 2006, month: "jun", date: "00/06/2006" },
      { year: 2006, month: "jun", day: "06", date: "06/06/2006" },
      { year: 2006, month: "jun", day: "05", date: "05/06/2006" },
      { year: 2006, month: "may", date: "00/05/2006" },
      { year: 2005, date: "00/00/2005" },
      { year: 2018, month: "aug", day: "09", date: "09/08/2018" },
      { year: 2018, month: "sep", date: "00/09/2018" },
      { year: 2019, date: "00/00/2019" },
    ];
    store.dispatch(setResults(dummyArray));
    act(() => {
      assert.equal(13, store.getState().results.length);
    });
  });
});
