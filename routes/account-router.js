const { BeforeAll } = require("cucumber");
const express = require("express");
const bodyParser = require("body-parser");
const accountPaperControl = require("../controllers/accountController");

const accountPaperController = new accountPaperControl();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/signin", async (req, res) => {
  console.log("passing details to server");
  let code = await accountPaperController.signIn({
    username: req.body.username,
    password: req.body.password,
  });

  switch (code) {
    case 0:
      return res.send({
        success: false,
        error: "BAD PASSWORD",
        code: 0,
      });
    case 1:
      return res.send({
        success: true,
        code: 1,
      });
    case 2:
      return res.send({
        success: false,
        error: "BAD USERNAME",
        code: 2,
      });
    default:
      break;
  }

  return res.send({
    success: false,
    error: "SESSION FAIL",
    code: 4,
  });
});

router.post("/signup", async (req, res) => {
  console.log("passing details to server");
  let code = await accountPaperController.registerAccount({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role,
  });
  console.log(code);
  switch (code) {
    case 0:
      return res.send({ success: false, code: 0, error: "BAD USERNAME" });
    case 1:
      return res.send({ success: true, code: 1 });
    case 2:
      return res.send({ success: false, code: 2, error: "BAD PASSWORD" });
    case 3:
      return res.send({
        success: false,
        code: 3,
        error: "USERNAME ALREADY EXIST",
      });
    default:
      break;
  }

  return res.send({ success: false, code: 4, error: "SESSION FAIL" });
});

router.post("/profile", async (req, res) => {
  //console.log(req.body);
  let info = await accountPaperController.getInfoJSON(req.body.username);
  if (!info) {
    return res.send({
      success: false,
      error: "USERNAME NOT EXIST",
      code: 4,
    });
  } else {
    let infoJSON = JSON.parse(info);
    return res.send({ data: infoJSON });
  }
});

module.exports = router;
