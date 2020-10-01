const express = require("express");

const paperController = require("./controllers/papersController");
const searchController = require("./controllers/searchByNameController");
const queuedPaperModelController = require("./controllers/queuedPaperModelController");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const { sayHello } = require("./test");

app.use(express.static(path.join(__dirname, "client/build")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.post("/", async function (req, res) {
  var header = req.header("title");
  var data = req.body;
  console.log(header);
  if (header == "Searching_Paper") {
    const papers = searchController.getPapers(data.text);
    papers.then((paperData) => {
      console.log("requested papers");
      res.send(paperData);
    });
  } else if (header == "Submit_Paper") {
    console.log("Submitting paper");
    const submission = new queuedPaperModelController();
    await submission.insertNewPaper(data);
    res.send(true);
    console.log("Submitted paper");
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
