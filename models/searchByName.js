const mongoose = require("mongoose");

const url =
  "mongodb+srv://Dan:qwer1234@cluster0.ceddt.mongodb.net/PaperDB?retryWrites=true&w=majority";

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
