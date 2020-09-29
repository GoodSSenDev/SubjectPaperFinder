const express = require("express");

const paperController = require("./controllers/papersController");
const searchController = require("./controllers/searchByNameController");
const paperRouter = require("./routes/paper-router");
const path = require("path");
const PORT = process.env.PORT || 5000;
var app = express();

//app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res) {
  res.send("<h1>  </h1>");
});

app.get("/data", (req, res) => {
  const papers = searchController.getPapers("most");
  papers.then((paperData) => res.send(paperData));
});

app.use("/api", paperRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
