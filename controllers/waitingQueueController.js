const quequedPaperModel = require("../models/waitingQueue");

async function getquequedpapers() {
    const quequedpapers = await quequedPaperModel.waitingQueue();
    return quequedpapers;
}
module.exports.getquequedpapers = getquequedpapers;