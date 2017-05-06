/**
 * Created by inbar on 26/04/2017.
 */
var express = require("express");
var app = express(); // express.createServer();
//use express.static('public')
app.use(express.static(__dirname + "/public"));

noMessage = {
    text: ["no message to show"],
    template: "template1.html",
    ttl: 5000
}
images_path = "/resources/"
message1 = [{
    screen: 1, config: {
        text: ["line1", "line2", "line3", "line4"],
        image: [images_path + "message1_image1.jpeg", images_path + "message1_image2.jpeg"],
        template: "template1.html",
        times_to_show: [{day: "Monday", time: ["06:00", "12:00"]},
            {day: "Wednesday", time: ["13:00", "20:00"]}],
        date_to_show: ["01.01.2017", "01.01.2018"],
        ttl: 5000
    }
},
    {
        screen: 2, config: {
        text: ["line1", "line2", "line3", "line4"],
        image: ["message1_image1.jpeg", "message1_image2.jpeg"],
        template: "template1.html",
        times_to_show: [{day: "Monday", time: ["06:00", "12:00"]},
            {day: "Wednesday", time: ["13:00", "20:00"]}],
        date_to_show: ["01.01.2017", "01.01.2018"],
        ttl: 5000
    }
    }];


message2 = [{
    screen: 1, config: {
        text: ["line1", "line2", "line3", "line4", "line5", "line6", "line7", "line8", "line9", "line10"],
        image: [images_path + "message2_image1.jpeg"],
        template: "template2.html",
        times_to_show: [{day: "Tuesday", time: ["10:00", "16:00"]},
            {day: "Wednesday", time: ["10:00", "16:00"]}],
        date_to_show: ["01.03.2017", "01.05.2017"],
        ttl: 5000
    }
},
    {
        screen: 3, config: {
        text: ["line1", "line2", "line3", "line4", "line5", "line6", "line7", "line8", "line9", "line10"],
        image: ["message2_image1.jpeg"],
        template: "template2.html",
        times_to_show: [{day: "Tuesday", time: ["10:00", "16:00"]},
            {day: "Wednesday", time: ["10:00", "16:00"]}],
        date_to_show: ["01.03.2017", "01.05.2017"],
        ttl: 5000
    }
    }];

message3 = [{
    screen: 2, config: {
        template: "template3.html",
        times_to_show: [{day: "Sunday", time: ["08:00", "22:00"]},
            {day: "Monday", time: ["08:00", "22:00"]},
            {day: "Tuesday", time: ["08:00", "22:00"]},
            {day: "Wednesday", time: ["08:00", "22:00"]},
            {day: "Thursday", time: ["08:00", "22:00"]},
            {day: "Friday", time: ["08:00", "22:00"]},
            {day: "Saturday", time: ["08:00", "22:00"]}],
        date_to_show: ["01.05.2017", "16.06.2017"],
        ttl: 5000
    }
},
    {
        screen: 3, config: {
        template: "template3.html",
        times_to_show: [{day: "Sunday", time: ["08:00", "22:00"]},
            {day: "Monday", time: ["08:00", "22:00"]},
            {day: "Tuesday", time: ["08:00", "22:00"]},
            {day: "Wednesday", time: ["08:00", "22:00"]},
            {day: "Thursday", time: ["08:00", "22:00"]},
            {day: "Friday", time: ["08:00", "22:00"]},
            {day: "Saturday", time: ["08:00", "22:00"]}],
        date_to_show: ["01.05.2017", "16.06.2017"],
        ttl: 5000
    }
    }];

message4 = [{
    screen: 1, config: {
        text: ["line1", "line2"],
        template: "template1.html",
        times_to_show: [{day: "Monday", time: ["17:00", "19:00"]}],
        date_to_show: ["29.03.2017", "16.04.2017"],
        ttl: 5000
    }
}];

message5 =
    [{
        screen: 3, config: {
            text: ["line1", "line2", "line3", "line4", "line5", "line6", "line7"],
            image: [images_path + "message5_image1.jpeg", images_path + "message5_image2.jpg"],
            template: "template2.html",
            times_to_show: [{day: "Monday", time: ["01:00", "23:00"]},
                {day: "Tuesday", time: ["01:00", "23:00"]},
                {day: "Wednesday", time: ["01:00", "23:00"]}],
            date_to_show: ["01.04.2017", "01.05.2017"],
            ttl: 5000
        }
    }]

;
var messages = [message1, message2, message3, message4, message5];
var screen_status = {};

app.get("/screen=1", function (request, response) {
        // If Screen already requested messages
        if ("1" in screen_status) {
            screen_status["1"] = (screen_status["1"] + 1) % messages.length;
            response.json(showNext(1));
        }
        // If Screen didnt already requested messages
        else {
            screen_status["1"] = -1;
            response.sendfile(__dirname + "/MainScreen.html");
        }
    }
);

app.get("/screen=2", function (request, response) {
        // If Screen already requested messages
        if ("2" in screen_status) {
            screen_status["2"] = (screen_status["2"] + 1) % messages.length;
            response.json(showNext(2));
        }
        // If Screen didnt already requested messages
        else {
            screen_status["2"] = -1;
            response.sendfile(__dirname + "/MainScreen.html");
        }
    }
);

app.get("/screen=3", function (request, response) {
        // If Screen already requested messages
        if ("3" in screen_status) {
            screen_status["3"] = (screen_status["3"] + 1) % messages.length;
            response.json(showNext(3));
        }
        // If Screen didnt already requested messages
        else {
            screen_status["3"] = -1;
            response.sendfile(__dirname + "/MainScreen.html");
        }
    }
);

app.get("/", function (request, response) {
    response.sendfile(__dirname + "/NoScreenDefined.html")
});

app.listen(8080);

function isDateBetween(dateFrom, dateTo, dateCheck) {
    var d1 = dateFrom.split(".");
    var d2 = dateTo.split(".");
    var c = dateCheck.split(".");

    var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  // -1 because months are from 0 to 11
    var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);
    return (check >= from && check <= to)
}

function showNext(screen) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var fullDate = dd + "." + mm + "." + yyyy;
    var hour = today.getHours() + ":" + "00";
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var day = weekday[today.getDay()];

    for (var i in messages) {
        message_index = (parseInt(i) + parseInt(screen_status[screen])) % messages.length;

        for (var screen_index in messages[message_index]) {
            if (messages[message_index][screen_index]["screen"] == screen) {
                for (var times_index in messages[message_index][screen_index]["config"]["times_to_show"]) {
                    if (messages[message_index][screen_index]["config"]["times_to_show"][times_index]["day"] == day &&
                        isDateBetween(messages[message_index][screen_index]["config"]["date_to_show"][0], messages[message_index][screen_index]["config"]["date_to_show"][1], fullDate)) {
                        var fromHour = messages[message_index][screen_index]["config"]["times_to_show"][times_index]["time"][0];
                        var toHour = messages[message_index][screen_index]["config"]["times_to_show"][times_index]["time"][1];
                        var fromDiff = ( new Date("1970-1-1 " + hour + ":00") - new Date("1970-1-1 " + fromHour) ) / 1000 / 60 / 60;
                        var toDIff = ( new Date("1970-1-1 " + toHour) - new Date("1970-1-1 " + hour + ":00") ) / 1000 / 60 / 60;

                        if (fromDiff >= 0 && toDIff >= 0) {
                            screen_status[screen] = message_index;
                            return messages[message_index][screen_index]["config"];
                        }
                    }
                }
            }
        }
    }

    return noMessage;
}