const express = require("express");
const bodyParser = require("body-parser");
const queuedPaperControl = require("../controllers/queuedPaperController");
const acceptPaperControl = require("../controllers/acceptPaperController");
const researchPaperControl = require("../controllers/researchPaperController");

const queuedPaperController = new queuedPaperControl();
queuedPaperController.init();

const acceptPaperController = new acceptPaperControl();
acceptPaperController.init();

const researchPaperController = new researchPaperControl();
researchPaperController.init();

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Submitter -> Moderator -> Serl Analyst -> ResearchPaperDatabase
//Queued paper -> Accept paper -> Research paper

router.post("/get-queued-papers", async (req, res) => {
  let papers = [];
  let success = true;
  console.log("requested queued");
  papers = await queuedPaperController.getQueuedPapers().catch((error) => {
    console.log(error);
    success = false;
  });

  return res.send({
    success: success,
    papers: papers,
  });
});

router.post("/get-accepted-papers", async (req, res) => {
  let papers = [];
  let success = true;
  papers = await acceptPaperController.getAcceptedPapers().catch((error) => {
    console.log(error);
    success = false;
  });

  return res.send({
    success: success,
    papers: papers,
  });
});

router.post("/get-research-papers", async (req, res) => {
  let papers = [];
  let success = true;
  papers = await researchPaperController.getResearchPapers().catch((error) => {
    console.log(error);
    success = false;
  });

  return res.send({
    success: success,
    papers: papers,
  });
});

router.post("/submit-queued-papers", async (req, res) => {
  //do not include PID in Paper
  let success = await queuedPaperController.insertNewQueuedPaper(
    req.body.paper
  );

  return req.send({
    success: success,
  });
});

router.post("/accept-queued-paper", async (req, res) => {
  let success = true;
  let papers = [];

  papers = await queuedPaperController
    .deleteQueuedPaperId(req.body.PID)
    .catch((error) => {
      console.log(error);
      return res.send({
        success: false,
        code: 0,
      });
    });
  console.log(req.body.paper);
  success = await acceptPaperController
    .insertNewAcceptedPaper(req.body.paper)
    .catch((error) => {
      console.log(error);
      return res.send({
        success: false,
        papers: papers,
        code: 2,
      });
    });

  return res.send({
    success: success,
    papers: papers,
    code: 1,
  });
});

router.post("/accept-accepted-paper", async (req, res) => {
  let success = true;
  let papers = [];

  papers = await acceptPaperController
    .deleteAcceptedPaperId(req.body.PID)
    .catch((error) => {
      console.log(error);
      return res.send({
        success: false,
        code: 0,
      });
    });
  //paper should also contains array of tags
  success = await researchPaperController
    .insertNewResearchPaper(req.body.paper)
    .catch((error) => {
      console.log(error);
      return res.send({
        success: false,
        papers: papers,
        code: 2,
      });
    });

  return res.send({
    success: success,
    papers: papers,
    code: 1,
  });
});

router.post("/delete-queued-papers", async (req, res) => {
  let success = true;
  papers = await queuedPaperController
    .deleteQueuedPaperId(req.body.PID)
    .catch((error) => {
      console.log(error);
      success = false;
    });

  return req.send({
    success: success,
    papers: papers,
  });
});

router.post("/delete-accepted-papers", async (req, res) => {
  let success = true;
  let papers = [];
  papers = await acceptPaperController
    .deleteAcceptedPaperId(req.body.PID)
    .catch((error) => {
      console.log(error);
      success = false;
    });

  return req.send({
    success: success,
    papers: papers,
  });
});

router.post("/delete-research-papers", async (req, res) => {
  let success = true;
  let papers = [];
  papers = await researchPaperController
    .deleteResearchPaperId(req.body.PID)
    .catch((error) => {
      console.log(error);
      success = false;
    });

  return req.send({
    success: success,
    papers: papers,
  });
});

module.exports = router;
