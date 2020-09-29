const express = require("express");

const PaperNameCtrl = require("../controllers/searchByNameController");

const router = express.Router();

router.get("/", () => {
  console.log("paper-router.js");
  window.alert("paper-router.js");
  PaperNameCtrl.getPapers("most");
});

module.exports = router;
