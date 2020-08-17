const mongoose = require('mongoose')

const url = "mongodb+srv://Dan:qwer1234@cluster0.ceddt.mongodb.net/PaperDB?retryWrites=true&w=majority"

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
  return await Papers.find({})
}
