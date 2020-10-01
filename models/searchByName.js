require("./connectMongo");
const paperRecordModel = require("./connectMongo").paperRecordModel;

// Finds all papers with title: 'title' and returns list of fields: "author", "title", "journal"
async function getPaperByName(titleName) {
  // Change titleName to a regex to find all papers with the given search term in it (also case insensitive)
  // note: there might be a problem with special characters
  var regex = new RegExp(titleName, "i");
  const record = await paperRecordModel.find(
    { title: regex },
    "author title journal date -_id",
    function (err, arr) {
      if (err) return handleError(err);
    }
  );
  return record;
}

exports.getPaperByName = getPaperByName;
