// const mongoose = require('mongoose')

// const url = "mongodb+srv://Dan:qwer1234@cluster0.ceddt.mongodb.net/PaperDB?retryWrites=true&w=majority";

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// mongoose.connection.on('connected', () => {
//   console.log('Mongoose is connected')
// })
// //Create a schema to store data with
// const Schema = mongoose.Schema;
// const paperSchema = new Schema({
//   date : String,
//   title : String,
//   imgList : String,
//   content :String
// })

// //model = document
// const Model = mongoose.model;
// const Papers = Model('papers', paperSchema);

// exports.getPapers = async () => {
//   let paperAr =[]
//   await Papers.find(function(error, papers){
//     if(error){
//       console.log(`error :: ${error}`)
//     } 
//     else {
//       papers.forEach(function(row){
//         console.log('data :: ' + row.title)
//         paperAr.push([row.title,row.content])
//       })
//     }
//   })
//   return paperAr;
// }


// exports.getPapersJSON = async () => {
//   let paperAr =[]
//   await Papers.find(function(error, papers){
//     if(error){
//       console.log(`error :: ${error}`)
//     } else {
//       papers.forEach(function(row){
//         console.log('data :: ' + row.title)
//         paperAr.push(row.title,row.content)
//       })
//     }
//   })
//   return JSON.stringify(paperAr);
// }

