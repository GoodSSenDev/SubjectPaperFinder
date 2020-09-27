const mongoose = require("mongoose");

//using process dotenv need env file to excess the Test DB
require("dotenv").config();

const url;
//This check where the enviroment is on heroku or local
if('MONGO_DB' in process.env) {
  console.log("MONGO_DB set")
  url= process.env.MONGO_DB
} else if ('LOCAL_TEST' in process.env) {
  console.log("LOCAL_TEST set")
  url= process.env.MONGO_DB
} else throw 'Need a .env file that contains connection string key';

//const url = process.env.MONGO_DB

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});
//Choosing papers document schema to get collect data set
const Schema = mongoose.Schema;
const paperSchema = new Schema({
  date: String,
  title: String,
  imgList: String,
  content: String,
});

//model = document
const Model = mongoose.model;
const Papers = Model("papers", paperSchema);

exports.getPapers = async () => {
  let paperAr = [];
  await Papers.find(function (error, papers) {
    if (error) {
      console.log(`error :: ${error}`);
    } else {
      papers.forEach(function (row) {
        console.log("data :: " + row.title);
        paperAr.push([row.title, row.content]);
      });
    }
  });
  return paperAr;
};

exports.getPapersJSON = async () => {
  let paperAr = [];
  await Papers.find(function (error, papers) {
    if (error) {
      console.log(`error :: ${error}`);
    } else {
      papers.forEach(function (row) {
        console.log("data :: " + row.title);
        paperAr.push(row.title, row.content);
      });
    }
  });
  return JSON.stringify(paperAr);
};
