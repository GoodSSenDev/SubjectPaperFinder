const express = require("express");

const paperController = require("./controllers/papersController");
const searchController = require("./controllers/searchByNameController");
const paperRouter = require("./routes/paper-router");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");

//app.use(express.static(path.join(__dirname, "client/build")));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/", function (req, res) {
//   res.send("<h1>  </h1>");
// });

// app.get("/data", (req, res) => {
//   const papers = searchController.getPapers("most");
//   papers.then((paperData) => res.send(paperData));
// });

app.use("/api", paperRouter);
app.get("/", (req, res) => {
  res.send({ message: "Back end connected" });
});
app.post("/", async function (req, res) {
  // var data = {
  //   data: req.body.text,
  // };
  var temp = req.body.text;
  const papers = searchController.getPapers(req.body.text);
  //console.log(papers);
  papers.then((paperData) => {
    console.log(papers);
    res.send(paperData);
  });
  //console.log(req);
  console.log(req.body.text);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
