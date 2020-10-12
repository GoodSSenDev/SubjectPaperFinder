const close = require("../models/connectMongo").close;
const assert = require("assert");
const tagControl = require("../controllers/tagController.js");
const tagController = new tagControl();

describe("tag Control test", function () {

    it("tag Controller should add new tag.", async function () {
        
        await tagController.init();

        const dummyTagData = {
            Name: 'HOD',
            Level: 0,
        }

        await tagController.addNewTag(dummyTagData);
        setTimeout(() => { }, 300);
        assert.strictEqual(await tagController.checkTag('HOD'), true
            , "Can not find dummy tag data on data base");
        setTimeout(() => { }, 300);
    });
    
    it("tag Controller should return '' if tagNumber is not exist", async function () {
        assert.strictEqual(await tagController.getTagName(-1), ''
            , "Cannot return '' when getting not exists tagName by tagNumber");
        setTimeout(() => { }, 300);
    });
    
    it("tag Controller should return -1 if tagName is not exist", async function () {
        assert.strictEqual(await tagController.getTagID('hoki'), -1
        , "Cannot return -1 when getting not exists tagID by tagName");
        setTimeout(() => { }, 300);
    });

    it("tag Controller should return tagName if tagNumber is not exist", async function () {
        assert.strictEqual(await tagController.getTagName(1), 'testTag'
            , "Cannot return tagName when getting exists tagName by tagNumber");
        setTimeout(() => { }, 300);
    });
    
    it("tag Controller should return a tagID if tagName exist", async function () {
        assert.strictEqual(await tagController.getTagID('HOD') > 0, true
        , "Cannot return ID when getting exesist tagID by tagName");
        setTimeout(() => { }, 300);
    });

    it("tag Controller should return array of tags", async function () {
        let tags = await tagController.getTags();
        let tagfilteredList = tags.filter(x => x.Name == 'HOD' || x.Name == 'testTag' );

        let checkingBool = false;
        if(tagfilteredList && tagfilteredList.length > 1){
            checkingBool = true;
        }
        assert.strictEqual(checkingBool, true
            , "Cannot return  correct list of tag");
        setTimeout(() => { }, 300);
    });

    it("tag Controller should delete the user.", async function () {
        const dummyTagData2 = {
            Name: 'HOD2',
            Level: 0,
        }

        await tagController.addNewTag(dummyTagData2);
        await tagController.deleteTagByName('HOD2');
        setTimeout(() => { }, 5000);
        assert.strictEqual(await tagController.checkTag('HOD2'), false
            , "Cannot delete the dummy data in the data base");
        setTimeout(() => { }, 300);
    });

});

after(async function () {
    await tagController.deleteTagByName('HOD');
    close();
})   