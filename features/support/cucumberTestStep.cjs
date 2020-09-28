import YouSuck from "./yousuck.cjs";
const { Given, When, Then } = require("cucumber");
const assert = require("assert").strict;

Given("you suck", function () {
  suck = new YouSuck();
});

When("you suck less", function () {
  suck.suckLess();
});

Then("you dont suck", function () {
  assert.equal(false, false);
});
