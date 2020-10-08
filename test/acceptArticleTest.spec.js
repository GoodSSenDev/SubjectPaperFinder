const assert = require("assert");
const close = require("../models/connectMongo").close;
const queuedPapers = require("../models/queuedPaperModel");
const acceptedModel = require("../models/acceptedPapersModel").acceptedModel;
const moveDocument = require("../controllers/acceptArticleController").moveDocument;


describe("move article", function () {
  it("should move an article from one document to another", async function () {
    this.timeout(10000);
    var works = await moveDocument(100, queuedPapers, acceptedModel);
    assert.equal(works, true);
  });
});

after(async function() {
    await moveDocument(100, acceptedModel, queuedPapers);
});
