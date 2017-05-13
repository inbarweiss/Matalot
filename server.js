/**
 * Created by inbar on 26/04/2017.
 */
var express = require("express");
var app = express(); // express.createServer();
//use express.static('public')
app.use(express.static(__dirname + "/public"));
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://127.0.0.1:27017/myproject';
noMessage = {
    text: ["no message to show"],
    template: "template1.html",
    ttl: 5000
}
images_path = "/resources/"
var messages = [];
var messagesLength=1;
var findMessages = function(screenNum,db, callback) {

    var cursor =db.collection('messages').find({"message.screen":screenNum});
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
           // console.log(doc.message)
            messages.push(doc.message);
            //console.log(JSON.parse(doc).getAttributeNode("message").toString());
            //console.dir(doc);
        }
    });
    callback();
};




var screen_status = {};

app.get("/screen=1", function (request, response) {
        // If Screen already requested messages
        if ("1" in screen_status) {
            screen_status["1"] = (screen_status["1"] + 1) % messagesLength;
            response.json(showNext(1));
        }
        // If Screen didnt already requested messages
        else {
            screen_status["1"] = -1;
            response.sendFile(__dirname + "/MainScreen.html");
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
            response.sendFile(__dirname + "/MainScreen.html");
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
            response.sendFile(__dirname + "/MainScreen.html");
        }
    }
);

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/NoScreenDefined.html")
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

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findMessages(screen,db, function() {
            for (var i in messages) {

                message_index = (parseInt(i) + parseInt(screen_status[screen])) % messagesLength;

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
            if(messages.length!=0){
            messagesLength=messages.length;
            }
            else
            {
                messagesLength=1;
            }
            console.log(messages.length);
            messages=[];
            db.close();
        });
    });

  //  messages.push("",function () {
    //    console.log("wow");

    //});


 //   function(){console.log("bla")},100);
    return noMessage;
}