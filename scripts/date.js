// we have a make date function
var makeDate = function()   {
    var d = new Date();
    var formattedDate = "";
// these are built in javascript functions and we add one to make it so that it is real time months
    formattedDate += (d.getMonth()  + 1) + "_";
    formattedDate += d.getDate() + "_";
    formattedDate += d.getFullYear();
// we are returning formattedDate
    return formattedDate;

};
// we then export makeDate
module.exports = makeDate;