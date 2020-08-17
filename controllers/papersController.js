//get paper date
const paperModel = require("../models/subjectPaperModel")

exports.getPaperPrintConsole = async (req, res, next) => {
    const papers = await paperModel.getPapers()
    console.log(papers)
}

