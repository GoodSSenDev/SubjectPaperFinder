const paperModel = require("../models/searchByDate.js");
const CheckBetween = require("../models/searchByDate.js").checkBetween;

async function getPapers(date) {
  const papers = await paperModel.getPaperByDate(date);
  return papers;
}

function checkBetween(date, papers) {
  return CheckBetween(date, papers);
}

module.exports.getPapers = getPapers;
module.exports.checkBetween = checkBetween;
