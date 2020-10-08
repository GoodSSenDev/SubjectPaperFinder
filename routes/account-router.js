const { BeforeAll } = require("cucumber");
const express = require("express");
const accountPaperControl = require("../controllers/accountController");

const accountPaperController = new accountPaperControl();
const router = express.Router();



router.post('/signin', async (req, res) => {

    let code = await accountPaperController.signIn(
        { username: req.body.username, password: req.body.password }
    );

    switch (code) {
        case 0:
            return res.status(400).json({
                success: false,
                error: "BAD PASSWORD",
                code: 0
            });
        case 1:
            return res.status(400).json({
                success: true,
                code: 1
            });
        case 2:
            return res.status(401).json({
                success: false,
                error: "BAD USERNAME",
                code: 2
            });
        default:
            break;
    }

    return res.status(400).json({
        success: false,
        error: "SESSION FAIL",
        code: 5
    });
});


router.post('/signup', async (req, res) => {

    let code = await accountPaperController.registerAccount(
        { username: req.body.username, password: req.body.password, email: req.body.email, role: req.body.role }
    );

    switch (code) {
        case 0:
            return res.status(400).json({
                success: false,
                error: "BAD USERNAME",
                code: 0
            });
        case 1:
            return res.status(400).json({
                success: true,
                code: 1
            });
        case 2:
            return res.status(400).json({
                success: false,
                error: "BAD PASSWORD",
                code: 2
            });
        case 3:
            return res.status(409).json({
                success: false,
                error: "USERNAME ALREADY EXIST",
                code: 3
            });
        default:
            break;
    }

    return res.status(400).json({
        success: false,
        error: "SESSION FAIL",
        code: 5
    });
});

router.post('/getInfo', async (req, res) => {

    let info = await accountPaperController.getInfoJSON(
        { username: req.body.username }
    );
    if (!info) {

        return res.status(400).json({
            success: false,
            error: "USERNAME NOT EXIST",
            code: 5
        });
    } else {
        res.json(info);
    }
});


module.exports = router;