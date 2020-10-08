const moveDoc = require("../models/acceptArticle").moveDocument;

// moves the article with _Pid: "PID" from 'fromDoc' to 'toDoc' and returns 'true' if it works
async function moveDocument(PID, fromDoc, toDoc) {
  return await moveDoc(PID, fromDoc, toDoc);
}

module.exports.moveDocument = moveDocument;
