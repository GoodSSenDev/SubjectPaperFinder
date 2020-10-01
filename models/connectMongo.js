const mongoose = require("mongoose");

const url =
  "mongodb+srv://Dan:qwer1234@cluster0.ceddt.mongodb.net/PaperDB?retryWrites=true&w=majority";

//setup connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//get default connection and get error notification (if there is an error)
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

var Schema = mongoose.Schema;
var paperSchema = new Schema({
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

exports.close = close;
exports.paperRecordModel = paperRecordModel;
