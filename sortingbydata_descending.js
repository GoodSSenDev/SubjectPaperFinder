var ul = document.getElementsByTagName('ul')[0];
var li = ul.getElementsByTagName('li');
var list = [];


function fun1(ul, li, list) {
    for (var i = 0; i < li.length; i++) {
        var tmp = {};
        tmp.dom = li[i];
        tmp.date = new Date(li[i].firstChild.data.replace(/-/g, '/'));
        list.push(tmp);
    }
    list.sort(function(a, b) {
        return a.date - b.date;
    });
    for (var i = 0; i < list.length; i++) {
        ul.appendChild(list[i].dom);
    }
}

function fun2() {
    alert('hi');
}

//1.get object of the 'sort'
var sort = document.getElementsByClassName("sort2");
//2.event
sort[0].onclick = function() {
    fun1(ul, li, list);
}