const express = require("express");
const bodyParser = require("body-parser");
const queuedPaperControl = require("../controllers/queuedPaperController");
const acceptPaperControl = require("../controllers/acceptPaperController");
const researchPaperControl = require("../controllers/researchPaperController");
const rejectedPaperControl = require("../controllers/rejectedPaperController");
const paperControl = require("../controllers/paperController");

const paperController = new paperControl();
paperController.init();

const queuedPaperController = new queuedPaperControl();
queuedPaperController.init();

const acceptPaperController = new acceptPaperControl();
acceptPaperController.init();

const researchPaperController = new researchPaperControl();
researchPaperController.init();

const rejectedPaperController = new rejectedPaperControl();
rejectedPaperController.init();

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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
  success = await paperController
    .insertNewPaper(req.body.paper)
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

router.post("/get-rejected-papers", async (req, res) => {
  let papers = [];
  let success = true;
  papers = await rejectedPaperController.getRejectedPapers().catch((error) => {
    console.log(error);
    success = false;
  });

  return res.send({
    success: success,
    papers: papers,
  });
});

router.post("/reject-queued-paper", async (req, res) => {
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
  //paper should also contains array of tags
  success = await rejectedPaperController
    .insertNewRejectedPaper(req.body.paper)
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

router.post("/delete-rejected-papers", async (req, res) => {
  let success = true;
  let papers = [];
  papers = await rejectedPaperController
    .deleteRejectedPaperId(req.body.PID)
    .catch((error) => {
      console.log(error);
      success = false;
    });

  return req.send({
    success: success,
    papers: papers,
  });
});

router.post("/get-papers", async (req, res) => {
  let success = true;
  let papers = [];
  papers = await paperController
    .getPaper(["00/00/2014","00/07/2019"])
    .catch((error) => {
      console.log(error);
      success = false;
    });

  return req.send({
    success: success,
    papers: papers,
  });
});

router.post("/get-papers", async (req, res) => {
  let success = true;
  let papers = [];
  papers = await paperController
    .getPapers(["00/00/2014","00/07/2019"])
    .catch((error) => {
      console.log(error);
      success = false;
    });

  return req.send({
    success: success,
    papers: papers,
  });
});

router.post("/delete-paper", async (req, res) => {
  let success = true;
  let papers = [];
  papers = await paperController
    .deletePaperId(req.body.PID)
    .catch((error) => {
      console.log(error);
      success = false;
    });

  return req.send({
    success: success,
    papers: papers,
  });
});


router.post("/get-date-papers", async (req, res) => {
  let success = true;
  let papers = [];
  papers = await paperController
    .getPapers([req.body.StartDate,req.body.EndDate])
    .catch((error) => {
      console.log(error);
      success = false;
    });

  return req.send({
    success: success,
    papers: papers,
  });
});

router.post("/get-search-title-papers", async (req, res) => {
  let success = true;
  let papers = [];
  papers = await paperController
    .getPaperByName(req.body.text)
    .catch((error) => {
      console.log(error);
      success = false;
    });

  return req.send({
    success: success,
    papers: papers,
  });
});

router.post("/get-date-search-title-papers", async (req, res) => {
  let success = true;
  let papers = [];
  papers = await paperController
    .getPaperByNameWithDate(req.body.text,[req.body.StartDate,req.body.EndDate])
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
