const mongoose = require("./connectMongo").mongoose;

// moves document 
async function moveDocument(PID, fromDoc, toDoc) {
  var works = false;
  const session = await mongoose.startSession();
  session.startTransaction();

  // find and switch documents
  var paper = await fromDoc.findOneAndDelete({ _PId: PID });
  if(!paper){
    console.log("no paper found of PID: " + PID);
  }
  else{
    await toDoc.collection.insertOne(paper);
    works = true;
  }

  await session.commitTransaction();
  session.endSession();
  return works;
}

exports.moveDocument = moveDocument;
