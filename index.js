const express = require("express");

//const paperController = require("./controllers/papersController");
const searchController = require("./controllers/searchByNameController");
const searchByDateController = require("./controllers/searchByDateController");
const queuedPaperController = require("./controllers/queuedPaperController");

const accountRouter = require("./routes/account-router");
const tagRouter = require("./routes/tag-router");
const paperRouter = require("./routes/paper-router");
const searchRouter = require("./routes/search-router");

const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const { sayHello } = require("./test");
const { getPaperByName } = require("./models/searchByName");
const accountController = require("./controllers/accountController");

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/tag", tagRouter);
app.use("/account", accountRouter);
app.use("/paper", paperRouter);
app.use("/search", searchRouter);

app.get("/", function (req, res) {
  res.send("<h1>  </h1>");
});

//Howard Uses this to test stuff :3
// app.get("/data", (req, res) => {
//   const papers = searchByDateController.getPapers(["00/00/2014", "00/07/2019"]);
//   papers.then((paperData) => res.send(paperData));
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
