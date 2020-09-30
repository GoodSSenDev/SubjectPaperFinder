const assert = require("assert");
const SortingByData_Asc = require("../sortingbydata_ascending").ascendingSort;

describe("Sorting Date", function () {
  it("check if ascending", () => {
    var dummydata = [
      {
        author: "jim",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "0/0/2020",
      },
      {
        author: "asdasd",
        title: "sadsa",
        journal: "ieje",
        date: "0/2/2020",
      },
      {
        author: "asdasd",
        title: "",
        journal: "",
        date: "2/1/2020",
      },
      {
        author: "asdasd",
        title: "",
        journal: "",
        date: "13/1/2020",
      },
    ];

    var actual = [
      {
        author: "jim",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "0/0/2020",
      },
      {
        author: "asdasd",
        title: "",
        journal: "",
        date: "2/1/2020",
      },
      {
        author: "asdasd",
        title: "",
        journal: "",
        date: "13/1/2020",
      },
      {
        author: "asdasd",
        title: "sadsa",
        journal: "ieje",
        date: "0/2/2020",
      },
    ];

    var result = SortingByData_Asc(dummydata);
    assert.equal(actual, result);
  });
});
