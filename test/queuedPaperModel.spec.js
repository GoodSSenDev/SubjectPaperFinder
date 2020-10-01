const { doesNotMatch } = require("assert");
const close = require("../models/connectMongo").close;
const assert = require("assert");
const queuedPaperModel = require("../models/queuedPaperModel");

describe("QueuedPaperModel test", function () {
  it("QueuedPaperModel should insert new Paper", async function () {
    const testingPaper = {
      author: "testMan",
      title: "testingTitle",
      journal: "software",
      year: "2008",
      page: "78--88",
      month: "jul",
      annote: "Accepted for publication",
    };
    await queuedPaperModel.insertNewQueuedPaper(testingPaper);

    setTimeout(() => {}, 1000);

    const arrayOfQueuedPaper = await queuedPaperModel.getQueuedPapers();
    assert.equal(arrayOfQueuedPaper[0].title, "testingTitle");
    await queuedPaperModel.deleteEveryQueuedPapers(0);

    setTimeout(() => {}, 1000);
  });

  it("QueuedPaperModel should Delete Queued Paper by Id", async function () {
    const testingPaper = {
      author: "testMan",
      title: "testingTitle1",
      journal: "software",
      year: "2008",
    };

    await queuedPaperModel.insertNewQueuedPaper(testingPaper);

    await queuedPaperModel.deleteEveryQueuedPapers(0);
    const arrayOfQueuedPaper = await queuedPaperModel.getQueuedPapers();

    assert.equal(arrayOfQueuedPaper.length == 0, true);
  });
});

after(() => {
  close;
});
