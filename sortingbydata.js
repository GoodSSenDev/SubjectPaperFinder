// // date list of time stamp
// var arr = [{
//     author: "",
//     title: "",
//     journal: "",
//     date: "0/0/2020"
// }, {
//     author: "",
//     title: "",
//     journal: "",
//     date: "0/2/2020"
// }, {
//     author: "",
//     title: "",
//     journal: "",
//     date: "2/1/2020"
// }];

exports.ascendingSort = (arr) => {
    //selection sort
    {
        var len = arr.length;
        var earlyIndex, temp;
        var date1 = [];
        var date2 = [];
        var datenum1 = 0;
        var datenum2 = 0;
        for (var i = 0; i < len - 1; i++) {

            date1 = arr[i].date.split("/"); // ["01", "00", "2020"]

            datenum1 = Number(date1[0]) + Number(date1[1]) * 100 + Number(date1[2]) * 10000 //year * 10000 + month * 100 + day 0 1 2

            earlyIndex = i;

            for (var j = i + 1; j < len; j++) {
                date2 = arr[j].date.split("/");
                datenum2 = Number(date2[0]) + Number(date2[1]) * 100 + Number(date2[2]) * 10000 //year * 10000 + month * 100 + day 0 1 2

                if (datenum2 < datenum1) {
                    earlyIndex = j;
                }

            }

            temp = arr[i];
            arr[i] = arr[earlyIndex];
            arr[earlyIndex] = temp;
        }
        return arr;
    }
};

exports.descendingSort = (arr) => {
    //selection sort
    {
        var len = arr.length;
        var earlyIndex, temp;
        var date1 = [];
        var date2 = [];
        var datenum1 = 0;
        var datenum2 = 0;
        for (var i = 0; i < len - 1; i++) {

            date1 = arr[i].date.split("/"); // ["01", "00", "2020"]

            datenum1 = Number(date1[0]) + Number(date1[1]) * 100 + Number(date1[2]) * 10000 //year * 10000 + month * 100 + day 0 1 2

            earlyIndex = i;

            for (var j = i + 1; j < len; j++) {
                date2 = arr[j].date.split("/");
                datenum2 = Number(date2[0]) + Number(date2[1]) * 100 + Number(date2[2]) * 10000 //year * 10000 + month * 100 + day 0 1 2

                if (datenum1 < datenum2) {
                    earlyIndex = j;
                }

            }

            temp = arr[i];
            arr[i] = arr[earlyIndex];
            arr[earlyIndex] = temp;
        }
        return arr;
    }
};