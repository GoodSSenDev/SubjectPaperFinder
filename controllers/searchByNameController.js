const paperModel = require("../models/searchByName");

async function getPapers(titleName) {
  const papers = await paperModel.getPaperByName(titleName);
  return papers;
}
module.exports.getPapers = getPapers;
