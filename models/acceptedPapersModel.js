const mongoose = require("./connectMongo").mongoose;

var Schema = mongoose.Schema;
const acceptedSchema = new Schema({
  _PId: { type: Number, required: true },
  author: { type: String, required: false },
  title: { type: String },
  journal: { type: String, required: false },
  year: { type: Number, required: false },
  pages: { type: String, required: false },
  month: { type: String, required: false },
  annote: { type: Number, required: false },
  eprint: { type: String, required: false },
  eprinttype: { type: String, required: false },
  eprintclass: { type: String, required: false },
});

const Model = mongoose.model;
const acceptedModel = Model("acceptedpapers", acceptedSchema);

module.exports = acceptedModel;
