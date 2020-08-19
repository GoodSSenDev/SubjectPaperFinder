const express = require('express')
const paperController = require('./controllers/papersController') 
const path = require('path');
const PORT = process.env.PORT || 5000;
var app = express()


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>')
})

app.get('/data', (req, res) => {
  const papers = paperController.getPapers()
  papers.then((paperData) => res.send(paperData))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))