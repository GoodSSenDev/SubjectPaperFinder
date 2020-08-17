const express = require('express')
const paperController = require('./controllers/papersController') 

const PORT = process.env.PORT || 5000;
var app = express()

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>')
})

app.get('/data', function (req, res) {
  paperController.getPaperPrintConsole()
  res.send('<h1>Hello world</h1>')
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))