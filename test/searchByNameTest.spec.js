const assert = require("assert");
const mongoose = require("mongoose");
require("../models/searchByName.js");
const paperRecordFinder = require("../models/searchByName.js")
  .paperRecordFinder;

describe("Mongoose", function () {
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

  it("should be in a state of connected", function () {
    assert.equal(mongoose.connection.readyState, 1);
  });

  it('should be connected to "papers" collection', async function () {
    assert.notEqual(mongoose.modelNames().indexOf("papers"), -1);
  });

  it("should be getting specific paper author", async function () {
    assert.equal(author, shouldAuthor);
  });

  it("should be getting specific paper title", async function () {
    assert.equal(title, shouldTitle);
  });

  it("should be getting specific paper journal", async function () {
    assert.equal(journal, shouldJournal);
  });
});
