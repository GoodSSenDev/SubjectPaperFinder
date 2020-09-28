const { doesNotMatch } = require("assert");
const assert = require("assert");
const mongoose = require("mongoose");
require("../models/searchByName.js");
const paperRecordFinder = require("../models/searchByName.js")
  .paperRecordFinder;

var testPaper;
before(async function () {
  testPaper = await paperRecordFinder(
    "{Most common mistakes in test-driven development practice: Results from an online survey with developers}"
  );
});

describe("Mongoose", function () {
  it("should be in a state of connected", () => {
    assert.equal(mongoose.connection.readyState, 1);
  });

  it('should be connected to "papers" collection', () => {
    assert.notEqual(mongoose.modelNames().indexOf("papers"), -1);
  });

  it("should be getting specific paper author", () => {
    assert.equal(
      testPaper[0].author,
      "Aniche, M F and Testing, MA Gerosa Software and {Verification} and {and} and {2010}"
    );
  });

  it("should be getting specific paper title", () => {
    assert.equal(
      testPaper[0].title,
      "{Most common mistakes in test-driven development practice: Results from an online survey with developers}"
    );
  });

  it("should be getting specific paper journal", () => {
    assert.equal(testPaper[0].journal, "journal = ieeexplore.ieee.org");
  });
});
