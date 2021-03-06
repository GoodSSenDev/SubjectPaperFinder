const assert = require("assert");
const mongoose = require("mongoose");
require("../models/waitingQueue.js");
const paperRecordFinder = require("../models/waitingQueue.js").waitingQueue;
const close = require("../models/connectMongo.js").close;

var testPaper;
before(async function() {
    this.timeout(30000);
    testPaper = await paperRecordFinder(
        "{Most common mistakes in test-driven development practice: Results from an online survey with developers}"
    );
});

describe("waitingQueue model test", function() {


    it("should be getting specific paper author", () => {
        assert.equal(
            testPaper[0].author,
            "testing"
        );
    });

    it("should be getting specific paper title", () => {
        assert.equal(
            testPaper[0].title,
            "test"
        );
    });

    it("should be getting specific paper journal", () => {
        assert.equal(testPaper[0].journal, "good");
    });
});

after(function() {
    close();
});