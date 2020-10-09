const assert = require("assert");
const SortingByDate = require("../sortingbydate");

describe("Sorting Date", function () {
  it("check if ascending", () => {
    var dummydata = [
      {
        author: "4",
        title: "sadsa",
        journal: "ieje",
        date: "0/2/2020",
      },
      {
        author: "3",
        title: "",
        journal: "",
        date: "13/1/2020",
      },
      {
        author: "2",
        title: "",
        journal: "",
        date: "2/1/2020",
      },
      {
        author: "1",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "0/0/2020",
      },
      {
        author: "0",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "0/0/0",
      },
    ];

    var expected = [
      {
        author: "0",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "0/0/0",
      },
      {
        author: "1",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "0/0/2020",
      },
      {
        author: "2",
        title: "",
        journal: "",
        date: "2/1/2020",
      },
      {
        author: "3",
        title: "",
        journal: "",
        date: "13/1/2020",
      },
      {
        author: "4",
        title: "sadsa",
        journal: "ieje",
        date: "0/2/2020",
      },
    ];

    var result = SortingByDate.ascendingSort(dummydata);
    console.log(result);

    let correct = true;
    let i;
    for (i = 0; i < expected.length; i++) {
      if (expected[i].date != result[i].date) {
        correct = false;
      }
    }
    assert.equal(true, correct);
  });

  it("check if descending", () => {
    var dummydata = [
      {
        author: "4",
        title: "sadsa",
        journal: "ieje",
        date: "0/2/2020",
      },
      {
        author: "3",
        title: "",
        journal: "",
        date: "13/1/2020",
      },
      {
        author: "2",
        title: "",
        journal: "",
        date: "2/1/2020",
      },
      {
        author: "1",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "0/0/2020",
      },
    ];

    var expected = [
      {
        author: "4",
        title: "sadsa",
        journal: "ieje",
        date: "0/2/2020",
      },
      {
        author: "3",
        title: "",
        journal: "",
        date: "13/1/2020",
      },
      {
        author: "2",
        title: "",
        journal: "",
        date: "2/1/2020",
      },

      {
        author: "1",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "0/0/2020",
      },
    ];

    var result = SortingByDate.descendingSort(dummydata);
    //console.log(result);

    let correct = true;
    let i;
    for (i = 0; i < expected.length; i++) {
      if (expected[i].date != result[i].date) {
        correct = false;
      }
    }
    assert.equal(true, correct);
  });
});
