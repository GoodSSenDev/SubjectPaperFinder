const express = require("express");

const PaperNameCtrl = require("../controllers/searchByNameController");

const router = express.Router();

router.post("/papername", PaperNameCtrl.getPapers);

module.exports = router;
