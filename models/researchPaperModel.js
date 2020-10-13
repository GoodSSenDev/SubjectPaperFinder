const { truncate } = require("fs");
const mongoose = require("./connectMongo").mongoose;

require("dotenv").config();

const Schema = mongoose.Schema;
const researchPaperSchema = new Schema({
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
  tags: [Number],
});

//model = document
const Model = mongoose.model;

module.exports = Model("researchpapers", researchPaperSchema);
