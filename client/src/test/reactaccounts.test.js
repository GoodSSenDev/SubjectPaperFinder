import React from "react";
import ReactDom from "react-dom";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { except } from "chai";
import renderer from "react-test-renderer";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

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
  it("Renders Login page correctly", function () {
    act(() => {
      renderer.create(<Login />);
    });
  });
  it("Renders signup page correctly", function () {
    act(() => {
      renderer.create(<SignUp />);
    });
  });
  it("Check Sign up interacts with server", function () {
    act(() => {
      renderer.create(<SignUp />);
    });
  });
});
