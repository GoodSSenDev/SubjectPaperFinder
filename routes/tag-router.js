const express = require("express");
const bodyParser = require("body-parser");
const tagControl = require("../controllers/tagController");

const tagController = new tagControl();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

await tagController.init();

router.post("/get-tags", async (req, res) => {

    let success = true;
    let tags = [];
    tags = await tagController.getTags().catch((error) => {
            console.log(error);
            success = false;
        });

    return res.send({
        success: success,
        tags: tags
    });
});

router.post("/add-tag", async (req, res) => {
    let success = await tagController.addNewTag({
                        Name: req.body.name,
                        Level: req.body.level,
                    });

    return res.send({
        success: success
    });
});

router.post("/delete-tag-by-name", async (req, res) => {

    let success = true;
    await tagController.deleteTagByName(req.body.name).catch((error) => { 
            console.log(error);
            success = false;
        })

    return res.send({
        success: success,
    });
});

router.post("/delete-tag-by-id", async (req, res) => {

    let success = true;
    await tagController.deleteTagByID(req.body.id).catch((error) => { 
            console.log(error);
            success = false;
        })

    return res.send({
        success: success,
    });
});

module.exports = router;