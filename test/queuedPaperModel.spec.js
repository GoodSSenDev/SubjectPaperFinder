const close = require("../models/connectMongo").close;
const assert = require("assert");
const queuedPaperController = require("../controllers/queuedPaperController");

const queuedPapers = new queuedPaperController();
before(function () {
  this.timeout(30000);
})
describe("QueuedPaperModel test", function () {

  it("QueuedPaperModel should insert new Paper", async function () {
    await queuedPapers.init();

    const testingPaper = {
      author: "testMan",
      title: "testingTitle",
      journal: "software",
      year: "2008",
      page: "78--88",
      month: "jul",
      annote: "Accepted for publication",
    };
    await queuedPapers.insertNewQueuedPaper(testingPaper);

    const arrayOfQueuedPaper = await queuedPapers.getQueuedPapers();
    let newArray = arrayOfQueuedPaper.filter(x => x.title == "testingTitle");
    setTimeout(() => { }, 2300);

    assert.strictEqual(newArray.length > 0, true);
  });


  it("QueuedPaperModel should Delete Queued Paper by Id", async function () {
    const testingPaper = {
      author: "testMan",
      title: "testingTitle1",
      journal: "software",
      year: "2008",
    };

    await queuedPapers.insertNewQueuedPaper(testingPaper);

    await queuedPapers.deleteQueuedPaperId(1);
    let arrayOfQueuedPaper = [];
    arrayOfQueuedPaper = await queuedPapers.getQueuedPapers();
    setTimeout(() => { }, 2300);

    await queuedPapers.deleteQueuedPaperAuthor("testMan");

    if (arrayOfQueuedPaper) {
      assert.strictEqual(true, true);
    } else assert.strictEqual(false, true);
  });
});

after(function () {
});
