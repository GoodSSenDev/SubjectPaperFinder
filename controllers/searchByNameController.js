const paperModel = require("../models/searchByName")

async function getPapers(titleName){
    const papers = await paperModel.paperRecordFinder(titleName)
    return papers;
}

module.exports.getPapers = getPapers;

