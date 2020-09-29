var express = require("express");
var router = express.Router();
const PaperNameCtrl = require("../../controllers/searchByNameController");

// router.get("/", function (req, res, next) {
//   res.send("Api working");
// });

router.get("/", async function (req, res, next) {
  const papers = PaperNameCtrl.getPapers("most");
  papers.then((paperData) => res.send(paperData));
});

// router.post("/", function (req, res) {
//   const text = req.body;
//   const papers = searchController.getPapers(text);
//   papers.then((paperData) => res.send(paperData));
// });

module.exports = router;
