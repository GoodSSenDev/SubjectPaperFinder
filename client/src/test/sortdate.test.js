const assert = require("assert");
const SortingByDate = require("../sortingbydate");

describe("Sorting Date", function () {
  it("check if ascending", () => {
    var dummydata = [
      {
        author: "8",
        title: "sadsa",
        journal: "ieje",
        date: "00/07/2019",
      },
      {
        author: "0",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "00/00/00",
      },

      {
        author: "2",
        title: "",
        journal: "",
        date: "00/08/2003",
      },
      {
        author: "1",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "00/08/2001",
      },
      {
        author: "4",
        title: "sadsa",
        journal: "ieje",
        date: "00/07/2006",
      },
      {
        author: "3",
        title: "",
        journal: "",
        date: "00/01/2006",
      },
      {
        author: "7",
        title: "sadsa",
        journal: "ieje",
        date: "00/11/2017",
      },

      {
        author: "5",
        title: "sadsa",
        journal: "ieje",
        date: "00/03/2009",
      },
      {
        author: "6",
        title: "sadsa",
        journal: "ieje",
        date: "00/03/2016",
      },

      {
        author: "9",
        title: "sadsa",
        journal: "ieje",
        date: "00/04/2020",
      },
    ];

    var expected = [
      {
        author: "0",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "00/00/00",
      },
      {
        author: "1",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "00/08/2001",
      },
      {
        author: "2",
        title: "",
        journal: "",
        date: "00/08/2003",
      },
      {
        author: "3",
        title: "",
        journal: "",
        date: "00/01/2006",
      },
      {
        author: "4",
        title: "sadsa",
        journal: "ieje",
        date: "00/07/2006",
      },
      {
        author: "5",
        title: "sadsa",
        journal: "ieje",
        date: "00/03/2009",
      },
      {
        author: "6",
        title: "sadsa",
        journal: "ieje",
        date: "00/03/2016",
      },
      {
        author: "7",
        title: "sadsa",
        journal: "ieje",
        date: "00/11/2017",
      },
      {
        author: "8",
        title: "sadsa",
        journal: "ieje",
        date: "00/07/2019",
      },
      {
        author: "9",
        title: "sadsa",
        journal: "ieje",
        date: "00/04/2020",
      },
    ];

    var result = SortingByDate.ascendingSort(dummydata);
    console.log("---------------------Ascending");
    console.log("Sorted");
    console.log(result);
    console.log("Expected");
    console.log(expected);
    console.log("-------------------------------");
    let correct = true;
    let i;
    for (i = 0; i < expected.length; i++) {
      if (expected[i].date != result[i].date) {
        correct = false;
      }
    }
    //change this
    assert.equal(true, correct);
  });

  it("check if descending", () => {
    var dummydata = [
      {
        author: "8",
        title: "sadsa",
        journal: "ieje",
        date: "00/07/2019",
      },
      {
        author: "0",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "00/00/00",
      },

      {
        author: "2",
        title: "",
        journal: "",
        date: "00/08/2003",
      },
      {
        author: "1",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "00/08/2001",
      },
      {
        author: "4",
        title: "sadsa",
        journal: "ieje",
        date: "00/07/2006",
      },
      {
        author: "3",
        title: "",
        journal: "",
        date: "00/01/2006",
      },
      {
        author: "7",
        title: "sadsa",
        journal: "ieje",
        date: "00/11/2017",
      },

      {
        author: "5",
        title: "sadsa",
        journal: "ieje",
        date: "00/03/2009",
      },
      {
        author: "6",
        title: "sadsa",
        journal: "ieje",
        date: "00/03/2016",
      },

      {
        author: "9",
        title: "sadsa",
        journal: "ieje",
        date: "00/04/2020",
      },
    ];

    var expected = [
      {
        author: "9",
        title: "sadsa",
        journal: "ieje",
        date: "00/04/2020",
      },
      {
        author: "8",
        title: "sadsa",
        journal: "ieje",
        date: "00/07/2019",
      },
      {
        author: "7",
        title: "sadsa",
        journal: "ieje",
        date: "00/11/2017",
      },
      {
        author: "6",
        title: "sadsa",
        journal: "ieje",
        date: "00/03/2016",
      },
      {
        author: "5",
        title: "sadsa",
        journal: "ieje",
        date: "00/03/2009",
      },
      {
        author: "4",
        title: "sadsa",
        journal: "ieje",
        date: "00/07/2006",
      },
      {
        author: "3",
        title: "",
        journal: "",
        date: "00/01/2006",
      },
      {
        author: "2",
        title: "",
        journal: "",
        date: "00/08/2003",
      },
      {
        author: "1",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "00/08/2001",
      },

      {
        author: "0",
        title: "asdsa",
        journal: "wioqhoqwe",
        date: "00/00/00",
      },
    ];

    var result = SortingByDate.descendingSort(dummydata);
    console.log("---------------------Descending");
    console.log("Sorted");
    console.log(result);
    console.log("Expected");
    console.log(expected);
    console.log("-------------------------------");

    let correct = true;
    let i;
    for (i = 0; i < expected.length; i++) {
      if (expected[i].date != result[i].date) {
        correct = false;
      }
    }
    //change this
    assert.equal(true, correct);
  });
});
