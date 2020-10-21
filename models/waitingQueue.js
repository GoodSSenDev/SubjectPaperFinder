const queuedPaperModel = require("./queuedPaperModel");

async function waitingQueue() {
    return await queuedPaperModel.find();
}

exports.waitingQueue = waitingQueue;