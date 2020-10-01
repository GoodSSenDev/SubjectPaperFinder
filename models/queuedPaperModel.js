const { truncate } = require("fs");
const mongoose = require("mongoose");

require("dotenv").config();

let url;
//This check where the enviroment is on heroku or local or CICD
if ("MONGO_DB" in process.env) {
  console.log("MONGO_DB set");
  url = process.env.MONGO_DB;
} else if ("LOCAL_TEST" in process.env) {
  console.log("LOCAL_TEST set");
  url = process.env.LOCAL_TEST;
} else {
  console.log("CI_TEST set");
  url =
    "mongodb+srv://DevTest2:UXUm9fdgNBywBTLY@cluster0.ceddt.mongodb.net/TestPaperDB?retryWrites=true&w=majority";
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});
//Choosing papers document schema to get collect data set
const Schema = mongoose.Schema;
const queuedPaperSchema = new Schema({
  _PId: { type: Number, required: true },
  author: { type: String, required: false },
  title: { type: String },
  journal: { type: String, required: false },
  year: { type: Number, required: false },
  pages: { type: String, required: false },
  month: { type: String, required: false },
  annote: { type: Number, required: false },
  eprint: { type: String, required: false },
  eprinttype: { type: String, required: false },
  eprintclass: { type: String, required: false },
});

//model = document
const Model = mongoose.model;
const QueuedPapers = Model("queuedpapers", queuedPaperSchema);

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

exports.connectionClose = () => {
  mongoose.connection.close();
};
