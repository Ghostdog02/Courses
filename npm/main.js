var moment = require("moment");
var unique = require("uniq");

var mydate = new Date();
let myCoolDate = moment(mydate).format("LL");

var myList = [1, 2, 3, 4, 4, 1, 2, 2, 6];

var myUniqueList = unique(myList)

console.log(myList);