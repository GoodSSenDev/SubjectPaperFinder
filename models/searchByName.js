require("./connectMongo");
const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var paperSchema = new Schema({
  author: { Type: String },
  title: { Type: String },
  journal: { Type: String },
});

//create model based on schema
var paperRecordModel = mongoose.model("papers", paperSchema);

// Finds all papers with title: 'title' and returns list of fields: "author", "title", "journal"
async function getPaperByName(titleName) {
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

exports.getPaperByName = getPaperByName;
