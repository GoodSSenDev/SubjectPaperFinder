const { doesNotMatch } = require("assert");
const assert = require("assert");
const mongoose = require("mongoose");
require("../models/searchByName.js");
const paperRecordFinder = require("../models/searchByName.js")
  .paperRecordFinder;

var author;
var title;
var journal;
var shouldAuthor;
var shouldTitle;
var shouldJournal;

before(async function () {
  var testPaper = await paperRecordFinder(
    "{Most common mistakes in test-driven development practice: Results from an online survey with developers}"
  );
  author = testPaper[0].author;
  title = testPaper[0].title;
  journal = testPaper[0].journal;
  shouldAuthor =
    "Aniche, M F and Testing, MA Gerosa Software and {Verification} and {and} and {2010}";
  shouldTitle =
    "{Most common mistakes in test-driven development practice: Results from an online survey with developers}";
  shouldJournal = "journal = ieeexplore.ieee.org";
});

describe("Mongoose", function () {
  it("should be in a state of connected", () => {
    assert.equal(mongoose.connection.readyState, 1);
  });

  it('should be connected to "papers" collection', () => {
    assert.notEqual(mongoose.modelNames().indexOf("papers"), -1);
  });

  it("should be getting specific paper author", () => {
    assert.equal(author, shouldAuthor);
  });

  it("should be getting specific paper title", () => {
    assert.equal(title, shouldTitle);
  });

  it("should be getting specific paper journal", () => {
    assert.equal(journal, shouldJournal);
  });
});
