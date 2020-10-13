const express = require("express");
const bodyParser = require("body-parser");
const researchPaperControl = require("../controllers/researchPaperController");

const researchPaperController = new researchPaperControl();
await researchPaperController.init();

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post("/tag-search-papers", async (req, res) => {
    let papers = [];
    let success = true;
    papers = await researchPaperController
        .filterUsingTag(req.body.papers,req.body.addTags,req.body.ignoreTags)
        .catch((error) => {
              console.log(error);
              success= false;
            });
    
    return res.send({
      success: success,
      papers: papers
    });
});
  

module.exports = router;