const mongoose = require("mongoose");

require("dotenv").config();

let url;
if ("MONGO_DB" in process.env) {
  console.log("MONGO_DB set");
  url = process.env.MONGO_DB;
} else if ("LOCAL_TEST" in process.env) {
  console.log("LOCAL_TEST set");
  url = process.env.LOCAL_TEST;
} else {
  console.log("CI_TEST set");
  url =
    "mongodb+srv://DevTest2:UXUm9fdgNBywBTLY@cluster0.ceddt.mongodb.net/TestPaperDB?retryWrites=true&w=majority";
}

//setup connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//get default connection and get error notification (if there is an error)
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

var SchemaDate = mongoose.Schema;
var paperSchema = new SchemaDate({
  author: { Type: String },
  title: { Type: String },
  journal: { Type: String },
  year: { Type: Number },
  month: { Type: String },
  day: { Type: Number },
  date: { Type: String },
});

//create model based on schema
var paperRecordModel = mongoose.model("papers", paperSchema);


function close() {
  mongoose.connection.close();
}

exports.mongoose = mongoose;
exports.close = close;
exports.paperRecordModel = paperRecordModel;