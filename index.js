const express = require("express");

const paperController = require("./controllers/papersController");
const searchController = require("./controllers/searchByNameController");
const searchByDateController = require("./controllers/searchByDateController");
const queuedPaperController = require("./controllers/queuedPaperController");
const accountRouter = require('../routes/account-rounter');

const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const { sayHello } = require("./test");
const { getPaperByName } = require("./models/searchByName");

app.use(express.static(path.join(__dirname, "client/build")));

app.use('/account', accountRouter);

app.get("/", function (req, res) {
  res.send("<h1>  </h1>");
});

app.get("/data", (req, res) => {
  const papers = searchByDateController.getPapers(["00/00/2014", "00/07/2019"]);
  papers.then((paperData) => res.send(paperData));
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.post("/", async function (req, res) {
  var header = req.header("title");
  var data = req.body;
  //console.log(header);
  if (header == "Searching_Paper") {
    var paperDataDate = [];
    var paperDataName = [];
    console.log(data);
    if (data.startDate != "" && data.endDate != "") {
      const paperdate = searchByDateController.getPapers([
        data.startDate,
        data.endDate,
      ]);
      paperdate.then((paperdate) => {
        paperDataDate = paperdate;
      });
    }
    console.log(data.text);
    const papers = searchController.getPapers(data.text);
    papers.then((paperData) => {
      //console.log("requested papers");
      paperDataName = paperData;
      res.send([paperDataName, paperDataDate]);
    });
  } else if (header == "Submit_Paper") {
    console.log("Submitting paper");
    const submission = new queuedPaperController();
    await submission.insertNewQueuedPaper(data);
    res.send(true);
    console.log("Submitted paper");
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
