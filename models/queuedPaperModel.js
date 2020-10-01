const { truncate } = require("fs");
const close = require("./connectMongo").close;
const QueuedPapers = require("./connectMongo").QueuedPapers;
require("./connectMongo");
require("dotenv").config();

//return tags in the database
exports.getQueuedPapers = async () => {
  let queuedPaperAr = [];
  await QueuedPapers.find(function (error, papers) {
    if (error) {
      console.log(`error :: ${error}`);
    } else {
      queuedPaperAr.forEach(function (row) {
        console.count("1");
      });

      queuedPaperAr = papers.map((row) => row);
    }
  });
  return queuedPaperAr;
};

// insert new paper
// id is auto generate by the code to not duplicate
exports.insertNewQueuedPaper = async (paper) => {
  const QueuedPapersNumber = await QueuedPapers.countDocuments();

  if (QueuedPapersNumber == 0) {
    await QueuedPapers.collection
      .insertOne({ _PId: 0, ...paper })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } else {
    //const { _PId } = await this.getQueuedPapers();
    const papers = await this.getQueuedPapers();
    const { _PId } = papers[papers.length - 1];
    await QueuedPapers.collection
      .insertOne({ _PId: _PId + 1, ...paper })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  return true;
};

exports.deleteQueuedPaperId = async (queuedPaperId) => {
  await QueuedPapers.deleteOne({ _PId: queuedPaperId }).catch((err) => {
    console.log(err);
    return false;
  });
  return true;
};

exports.deleteEveryQueuedPapers = async () => {
  // empty object will match everything
  await QueuedPapers.deleteMany({}).catch((err) => {
    console.log(err);
    return false;
  });
  return true;
};
