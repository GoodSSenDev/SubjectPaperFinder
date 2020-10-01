const mongoose = require("mongoose");

let url;
if ('MONGO_DB' in process.env) {
  console.log("MONGO_DB set")
  url = process.env.MONGO_DB
} else if ('LOCAL_TEST' in process.env) {
  console.log("LOCAL_TEST set")
  url = process.env.LOCAL_TEST
} else {
  console.log("CI_TEST set")
  url = "mongodb+srv://DevTest2:UXUm9fdgNBywBTLY@cluster0.ceddt.mongodb.net/TestPaperDB?retryWrites=true&w=majority";
}


//setup connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//get default connection and get error notification (if there is an error)
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

var Schema = mongoose.Schema;
var paperSchema = new Schema({
  author: String,
  title: String,
  journal: String,
});

//create model based on schema
var paperRecordModel = mongoose.model("papers", paperSchema);

// Finds all papers with title: 'title' and returns list of fields: "author", "title", "journal"
async function paperRecordFinder(titleName) {
  // Change titleName to a regex to find all papers with the given search term in it (also case insensitive)
  // note: there might be a problem with special characters
  var regex = new RegExp(titleName, "i");
  const record = await paperRecordModel.find(
    { title: regex },
    "author title journal -_id",
    function (err, arr) {
      if (err) return handleError(err);
    }
  );
  return record;
}

function close() {
  mongoose.connection.close();
}

module.exports.close = close;
module.exports.paperRecordFinder = paperRecordFinder;
module.exports.paperSchema = paperSchema;
