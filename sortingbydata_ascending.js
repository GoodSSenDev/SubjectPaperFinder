// date list of time stamp
var Datelist = [
    new Date('2020-1-1').valueOf(),
    new Date('2020-1-7').valueOf(),
    new Date('2021-1-2').valueOf(),
    new Date('2019-3-1').valueOf(),
    new Date('2020-2-1').valueOf(),
]

// var Sqlist = new Array()

// function of time format
function timeFormat(timer) {
    var date = new Date(timer); //change time stamp back to the date
    //year
    var y = data.getFullYear();
    //month
    var m = date.getMonth() + 1; //the month start form 0
    //day
    var d = date.getDate();
    return '${y}-${m}-${d}';
}

for (let i = 0; i < Datelist.length; i++) {
    timeFormat(Datelist[i]);
}

function ascending() {
    Datelist.sort(function(a, b) {
        return a - b;
    })
}