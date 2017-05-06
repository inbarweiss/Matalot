/**
 * Created by inbar on 26/04/2017.
 */
var express = require("express");
var app = express(); // express.createServer();
express.static('public')
app.use(express.static(__dirname + "/public"));
message1 = {
    text: ["line1","line2","line3","line4"],
    image: ["message1_image1.jpeg", "message1_image2.jpeg"],
    template: "template1.html",
    days_to_show: ["Monday", "Wednesday"],
    time_to_show: ["06:00", "12:00"],
    date_to_show: ["01.01.2017", "01.01.2018"],
    ttl: 5000
};


message2 = {
    text: ["line1","line2","line3","line4","line5","line6","line7","line8","line9","line10"],
    image: ["message2_image1.jpeg"],
    template: "template2.html",
    days_to_show: ["Tuesday", "Wednesday"],
    time_to_show: ["10:00", "16:00"],
    date_to_show: ["01.03.2017", "01.05.2017"],
    ttl: 5000
};

message3 = {
    template: "template3.html",
    days_to_show: ["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    time_to_show: ["08:00", "22:00"],
    date_to_show: ["01.05.2017", "16.06.2017"],
    ttl: 5000
};

message4 = {
    text: ["line1","line2"],
    template: "template1.html",
    days_to_show: ["Monday"],
    time_to_show: ["17:00", "19:00"],
    date_to_show: ["29.03.2017", "16.04.2017"],
    ttl: 5000
};

message5 = {
    text: ["line1","line2","line3","line4","line5","line6","line7"],
    image: ["message5_image1.jpeg", "message5_image2.jpg"],
    template: "template2.html",
    days_to_show: ["Monday","Tuesday", "Wednesday"],
    time_to_show: ["01:00", "23:00"],
    date_to_show: ["01.04.2017", "01.05.2017"],
    ttl: 5000
};
var messages = [message1, message2, message3, message4, message5];
app.get("/message", function(request, response){
    response.json(messages[showNext(request.query.currIndex)]);
});

app.get("/", function(request, response){
    response.sendfile(__dirname + "/MainScreen.html")});

app.listen(8080);


function isDateBetween(dateFrom, dateTo, dateCheck) {
    var d1 = dateFrom.split(".");
    var d2 = dateTo.split(".");
    var c = dateCheck.split(".");

    var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
    var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    var check = new Date(c[2], parseInt(c[1])-1, c[0]);
    return (check >= from && check <= to)
}
function contains(array,needle) {
    for(var item in array){
        if(array[item]==needle)
            return true;
    }
    return false;
}
function showNext(currIndex) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var fullDate = dd+"."+mm+"."+yyyy
    var hour = today.getHours()+":"+"00";
    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var day = weekday[today.getDay()];

    for(var index in messages)
    {
        if(contains(messages[index]["days_to_show"],day)&&
            isDateBetween(messages[index]["date_to_show"][0],messages[index]["date_to_show"][1],fullDate))
        {
            var fromHour = messages[index]["time_to_show"][0];
            var toHour =  messages[index]["time_to_show"][1];
            var fromDiff = ( new Date("1970-1-1 " + hour+":00") - new Date("1970-1-1 " + fromHour) ) / 1000 / 60 / 60;
            var toDIff = ( new Date("1970-1-1 " + toHour) - new Date("1970-1-1 " + hour+":00") ) / 1000 / 60 / 60;

            if((currIndex!=index || currIndex==-1)&&(fromDiff>=0&&toDIff>=0)){
                return index;
            }
        }
    }
    return -1;
}