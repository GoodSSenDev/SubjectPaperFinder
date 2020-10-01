const paperModel = require("../models/searchByDate.js");

async function getPapers(date) {
  const papers = await paperModel.getPaperByDate(date);
  return papers;
}

module.exports.getPapers = getPapers;
