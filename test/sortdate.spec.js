const assert = require("assert");
const SortingByData = require("../sortingbydata");

describe("Sorting Date", function() {
    it("check if ascending", () => {
        var dummydata = [{
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

        var expected = [{
                //     author: "jim",
                //     title: "asdsa",
                //     journal: "wioqhoqwe",
                //     date: "0/0/2020",
                // },
                // {
                //     author: "asdasd",
                //     title: "",
                //     journal: "",
                //     date: "2/1/2020",
                // },
                // {
                //     author: "asdasd",
                //     title: "",
                //     journal: "",
                //     date: "13/1/2020",
                // },
                // {
                //     author: "asdasd",
                //     title: "sadsa",
                //     journal: "ieje",
                //     date: "0/2/2020",
                // },

                author: "asdasd",
                title: "sadsa",
                journal: "ieje",
                date: "0/2/2020",

            },
            {
                author: "asdasd",
                title: "",
                journal: "",
                date: "13/1/2020",
            },
            {
                author: "asdasd",
                title: "",
                journal: "",
                date: "2/1/2020",
            },
            {
                author: "jim",
                title: "asdsa",
                journal: "wioqhoqwe",
                date: "0/0/2020",
            },
        ];

        var result = SortingByData.descendingSort(dummydata);
        console.log(result);
        assert.equal(expected[0].author, result[0].author);
        assert.equal(expected[1].author, result[1].author);
        assert.equal(expected[2].author, result[2].author);
        assert.equal(expected[3].author, result[3].author);
    });
});