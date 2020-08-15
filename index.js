const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000

var app = express()
let url = process.env.MONGODB_URL || "mongodb://localhost/testing"
mongoose.connect(url, {dbName: 'PaperDB'}, function(err){
  console.log('err ::' +err);
});

app.get('/', function (req, res) {
      res.send('<h1>Hello world</h1>')

})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
var Schema = mongoose.Schema;

var dairySchema = new Schema(
    {dare : String, title : String, imgList : String, content :String}
  )
  
var dates = mongoose.model('Papers', dairySchema);
  
dates.find(function(error, dairy){

    if(error){
      console.log("error ::"+error);
    }else{
  
      dairy.forEach(function(row){
        console.log("data :: "+row.title);
      })
    }
}) 
