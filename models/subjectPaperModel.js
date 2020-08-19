const mongoose = require('mongoose')

const url = process.env.MONGO_DB

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected')
})
//Choosing papers document schema to get collect data set
const Schema = mongoose.Schema;
const paperSchema = new Schema({
  date : String,
  title : String,
  imgList : String,
  content :String
})

//model = document
const Model = mongoose.model;
const Papers = Model('papers', paperSchema);

exports.getPapers = async () => {
  let paperAr =[]
  await Papers.find(function(error, papers){
    if(error){
      console.log(`error :: ${error}`)
    } else {
      papers.forEach(function(row){
        console.log('data :: ' + row.title)
        paperAr.push([row.title,row.content])
      })
    }
  })
  return paperAr;
}


exports.getPapersJSON = async () => {
  let paperAr =[]
  await Papers.find(function(error, papers){
    if(error){
      console.log(`error :: ${error}`)
    } else {
      papers.forEach(function(row){
        console.log('data :: ' + row.title)
        paperAr.push(row.title,row.content)
      })
    }
  })
  return JSON.stringify(paperAr);
}

