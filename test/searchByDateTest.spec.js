const assert = require("assert");
const getPaperByDate = require("../models/searchByDate.js").getPaperByDate;
const checkBetween = require("../models/searchByDate.js").checkBetween;
const shallowEqual = require("shallowequal");

before(function () {
  dummyArray = [
    { year: 2016, month: "mar", date: "00/03/2016" },
    { year: 2018, date: "00/00/2018" },
    { year: 2018, month: "aug", date: "00/08/2018" },
    { year: 2018, month: "aug", day: "08", date: "08/08/2018" },
    { year: 2006, date: "00/00/2006" },
    { year: 2006, month: "jun", date: "00/06/2006" },
    { year: 2006, month: "jun", day: "06", date: "06/06/2006" },
    { year: 2006, month: "jun", day: "05", date: "05/06/2006" },
    { year: 2006, month: "may", date: "00/05/2006" },
    { year: 2005, date: "00/00/2005" },
    { year: 2018, month: "aug", day: "09", date: "09/08/2018" },
    { year: 2018, month: "sep", date: "00/09/2018" },
    { year: 2019, date: "00/00/2019" },
  ];
});

beforeEach(function () {
  array = checkBetween(["06/06/2006", "08/08/2018"], dummyArray);
});

describe("Search by Date", function () {
  it("should check if normal record works ", function () {
    assert.equal(
      array.some((item) =>
        shallowEqual(item, { year: 2016, month: "mar", date: "00/03/2016" })
      ),
      true
    );
  });

  it("should check if upper proper(no day, no month, year) works", function () {
    assert.equal(
      array.some((item) =>
        shallowEqual(item, { year: 2018, date: "00/00/2018" })
      ),
      true
    );
  });

  it("should check if upper proper(no day, month, year) works", function () {
    assert.equal(
      array.some((item) =>
        shallowEqual(item, { year: 2018, month: "aug", date: "00/08/2018" })
      ),
      true
    );
  });

  it("should check if upper proper(day, month, year) works", function () {
    assert.equal(
      array.some((item) =>
        shallowEqual(item, {
          year: 2018,
          month: "aug",
          day: "08",
          date: "08/08/2018",
        })
      ),
      true
    );
  });

  it("should check if lower proper(no day, no month, year) works", function () {
    assert.equal(
      array.some((item) =>
        shallowEqual(item, { year: 2006, date: "00/00/2006" })
      ),
      true
    );
  });

  it("should check if lower proper(no day, month, year) works", function () {
    assert.equal(
      array.some((item) =>
        shallowEqual(item, { year: 2006, month: "jun", date: "00/06/2006" })
      ),
      true
    );
  });

  it("should check if lower proper(day, month, year) works", function () {
    assert.equal(
      array.some((item) =>
        shallowEqual(item, {
          year: 2006,
          month: "jun",
          day: "06",
          date: "06/06/2006",
        })
      ),
      true
    );
  });

  it("should check if lower improper(day), proper(month, year) works", function () {
    assert.equal(
      array.some((item) =>
        shallowEqual(item, {
          year: 2006,
          month: "jun",
          day: "05",
          date: "05/06/2006",
        })
      ),
      false
    );
  });

  it("should check if lower improper(month) proper(no day, year) works", function () {
    assert.equal(
      array.some((item) =>
        shallowEqual(item, { year: 2006, month: "may", date: "00/05/2006" })
      ),
      false
    );
  });

  it("should check if lower improper(year) proper(no day, no month) works", function () {
    assert.equal(
      array.some((item) =>
        shallowEqual(item, { year: 2005, date: "00/00/2005" })
      ),
      false
    );
  });

  it("should check if upper improper(day) proper(month, year) works", function () {
    assert.equal(
      array.some((item) =>
        shallowEqual(item, {
          year: 2018,
          month: "aug",
          day: "09",
          date: "09/08/2018",
        })
      ),
      false
    );
  });

  it("should check if upper improper(month) proper(no day, year) works", function () {
    assert.equal(
      array.some((item) =>
        shallowEqual(item, { year: 2018, month: "sep", date: "00/09/2018" })
      ),
      false
    );
  });

  it("should check if upper improper(year) proper(no day, no month) works", function () {
    assert.equal(
      array.some((item) =>
        shallowEqual(item, { year: 2019, date: "00/00/2019" })
      ),
      false
    );
  });
});
