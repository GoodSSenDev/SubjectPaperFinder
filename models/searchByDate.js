require("./connectMongo");
const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var paperSchema = new Schema({
  author: { Type: String },
  title: { Type: String },
  journal: { Type: String },
  year: { Type: Number },
  month: { Type: String },
});

//create model based on schema
var paperRecordModel = mongoose.model("papers", paperSchema);
