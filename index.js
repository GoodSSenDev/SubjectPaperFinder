const express = require("express");
const paperController = require("./controllers/papersController");
const searchController = require("./controllers/searchByNameController");
const path = require("path");
const PORT = process.env.PORT || 5000;
var app = express();

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res) {
  res.send("<h1>  </h1>");
});

app.get("/data", (req, res) => {
  const papers = searchController.getPapers("asdfghj");
  papers.then((paperData) => res.send(paperData));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
