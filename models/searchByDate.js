require("./connectMongo");
const paperRecordModel = require("./connectMongo").paperRecordModel;

async function getPaperByDate(date) {
  // obtain all records where the year exists
  let allRecords = await paperRecordModel.find({
    year: { $exists: true },
  });
  return checkBetween(date, allRecords);
}

// date input is an array of two values ["lower bound date", "upper bound date"], allRecords is an array of objects
function checkBetween(date, allRecords) {
  let returnArray = [];
  let date1 = date[0].split("/");
  let date2 = date[1].split("/");
  let cnctDate1 = date1[2] + date1[1] + date1[0];
  let cnctDate2 = date2[2] + date2[1] + date2[0];

  // checks if each record's date falls between the given dates
  for (let index = 0; index < allRecords.length; index++) {
    let currentRecordDate = allRecords[index].date.toString().split("/");
    let cnctRecordDate =
      currentRecordDate[2] + currentRecordDate[1] + currentRecordDate[0];
    // less than upper bound and greater than lower bound
    if (cnctRecordDate <= cnctDate2 && cnctRecordDate >= cnctDate1) {
      returnArray.push(allRecords[index]);
    }
    // if year = lower bound's year
    if (currentRecordDate[2] == date1[2]) {
      // account for month = 0
      if (currentRecordDate[1] == "00") {
        returnArray.push(allRecords[index]);
      } // account for day = 0
      else if (
        currentRecordDate[1] == date1[1] &&
        currentRecordDate[0] == "00"
      ) {
        returnArray.push(allRecords[index]);
      }
    }
  }
  // returns array of objects (object = record/tuple in this case)
  return returnArray;
}

exports.getPaperByDate = getPaperByDate;
exports.checkBetween = checkBetween;
