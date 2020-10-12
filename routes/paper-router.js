const express = require("express");
const bodyParser = require("body-parser");
const acceptPaperControl = require("../controllers/acceptPaperController");
const queuedPaperControl = require("../controllers/queuedPaperController");
const acceptedPaperController = require("../controllers/acceptPaperController");

const queuedPaperController = new queuedPaperControl();
await queuedPaperController.init();

const acceptPaperController = new acceptPaperControl();
await acceptPaperController.init();

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/get-accepted-papers", async (req, res) => {
  let papers = [];
  let success = true;
  papers = await acceptPaperController.getAcceptedPapers().catch((error) => {
            console.log(error);
            success= false;
          });
  
  return res.send({
    success: success,
    papers: papers
  });
});

router.post("/get-queued-papers", async (req, res) => {
  let papers = [];
  let success = true;
  papers = await queuedPaperController.getQueuedPapers().catch((error) => {
            console.log(error);
            success= false;
          });
  
  return res.send({
    success: success,
    papers: papers
  });
});

router.post("/submit-queued-papers", async (req, res) => {
  //do not include PID in Paper
  let success = await queuedPaperController.insertNewQueuedPaper(req.body.paper);

  return req.send({
    success: success,
  })
});

router.post("/accept-queued-paper", async (req,res) => {
  let success = true;

  await queuedPaperController.deleteQueuedPaperId(req.body.PID).catch((error) =>{
    console.log(error);
    return res.send({
      success: false,
      code: 0
    });
  });

  success = await acceptPaperController.insertNewAcceptedPaper(req.body.paper).catch((error) =>{
    console.log(error);
    return res.send({
      success: false,
      code: 2
    });
  });

  return res.send({
      success: success,
      code: 1
    });

});

router.post("/delete-accepted-papers", async (req, res) => {
  let success = true;
  let papers = []
  papers = await acceptPaperController.deleteAcceptedPaperId(req.body.PID).catch((error) => {
    console.log(error);
    success = false;
  });

  return req.send({
    success: success,
    papers: papers
  });
});

router.post("/delete-queued-papers", async (req, res) => {
  let success = true;
  papers = await queuedPaperController.deleteQueuedPaperId(req.body.PID).catch((error) => {
    console.log(error);
    success = false;
  });

  return req.send({
    success: success,
    papers: papers
  });
});

