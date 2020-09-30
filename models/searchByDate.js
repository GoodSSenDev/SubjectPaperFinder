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

async function getPaperByDate(date) {}

function getMonth(date) {
    let month;
    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    date.getMonth
}
