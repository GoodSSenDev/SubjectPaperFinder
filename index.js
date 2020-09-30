const express = require("express");

const paperController = require("./controllers/papersController");
const searchController = require("./controllers/searchByNameController");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");

app.use(express.static(path.join(__dirname, "client/build")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.post("/", async function (req, res) {
  var temp = req.body.text;
  const papers = searchController.getPapers(req.body.text);
  papers.then((paperData) => {
    //console.log(papers);
    console.log("requested papers");
    res.send(paperData);
  });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
