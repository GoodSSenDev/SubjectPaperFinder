// date list of time stamp
var arr = [{
    author: "",
    title: "",
    journal: "",
    date: "0/0/2020"
}, {
    author: "",
    title: "",
    journal: "",
    date: "0/2/2020"
}, {
    author: "",
    title: "",
    journal: "",
    date: "2/1/2020"
}];

//selection sort
function ascendingSort(arr) {
    var len = arr.length;
    var earlyIndex, temp;
    var date1 = [];
    var date2 = [];
    for (var i = 0; i < len - 1; i++) {
        date1 = arr[i].date.split("/"); // ["01", "00", "2020"]

        earlyIndex = i;

        for (var j = i + 1; j < len; j++) {

            date2 = arr[j].date.split("/");

            //compare year
            if (date1[2] < date2[2]) {

                earlyIndex = j;

            } else {
                // compare month
                if (date1[1] < date2[1]) {

                    earlyIndex = j;

                } else {
                    //compare day
                    if (date1[0] < date2[0]) {

                        earlyIndex = j;

                    }
                }

            }
        }

        temp = arr[i];
        arr[i] = arr[earlyIndex];
        arr[earlyIndex] = temp;
    }
    return arr;
}