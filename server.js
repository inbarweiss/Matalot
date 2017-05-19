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
var noMessage = {
    "text": ["no message to show"],
    "template": "template1.html",
    "screens": {
        "1": {ttl: 5000},
        "2": {ttl: 5000},
        "3": {ttl: 5000}
    }
};

var images_path = "/resources/";
var db;

var findMessages = function (screenNum, db, callback) {
    // Sets all the needed variables
    var now = new Date();
    var current_date = now.getFullYear() + '-' + padNumber(now.getMonth() + 1) + '-' + padNumber(now.getDate());
    var day_of_week = now.getDay() + 1;
    var time = padNumber(now.getHours()) + ':' + padNumber(now.getMinutes());
    var screen_field = 'screens.' + screenNum.toString();
    var start_date_field = screen_field + '.date_to_show.from';
    var end_date_field = screen_field + '.date_to_show.to';
    var times_to_show_field = screen_field + '.times_to_show';

    // Prepare query
    var query = {};
    query[screen_field] = {'$exists': true};
    query[start_date_field] = {'$lte': current_date};
    query[end_date_field] = {'$gt': current_date};
    query[times_to_show_field] = {
        '$elemMatch': {
            'day': day_of_week.toString(),
            'time.from': {'$lte': time},
            'time.to': {'$gt': time}
        }
    };

    db.collection('messages').find(query, function (err, cursor) {
        cursor.toArray(function (err, items) {
            console.log("length:" + items.length);
            callback(items);
        });
        ;
    });
};

app.get("/init", function (request, response) {
        console.log('check')
        response.sendFile(__dirname + "/MainScreen.html");
    }
);

app.get("/screen=1", function (request, response) {
        if (request.query.init == null) {
            response.sendFile(__dirname + "/MainScreen.html");
        }
        else {
            // If Screen already requested messages
            showNext(1, function (next_message) {
                response.json(next_message);
            });
        }
    }
);

app.get("/screen=2", function (request, response) {
        if (request.query.init == null) {
            response.sendFile(__dirname + "/MainScreen.html");
        }
        else {
            // If Screen already requested messages
            showNext(2, function (next_message) {
                response.json(next_message);
            });
        }
    }
);

app.get("/screen=3", function (request, response) {
        if (request.query.init == null) {
            response.sendFile(__dirname + "/MainScreen.html");
        }
        else {
            // If Screen already requested messages
            showNext(3, function (next_message) {
                response.json(next_message);
            });
        }
    }
);

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/NoScreenDefined.html")
});

MongoClient.connect(url, function (err, connection) {
        db = connection;
        app.listen(8080);
    }
);

function padNumber(number) {

    if (number >= 0 && number < 10) {
        padded_number = '0' + number;
    }
    else {
        padded_number = number;
    }

    return padded_number;
}

function showNext(screen, callback) {
    findMessages(screen, db, function (messages) {
        var next_message = noMessage;

        if (messages.length > 0) {
            next_message = messages[Math.floor(Math.random() * messages.length)];
        }

        callback(next_message);
    });
}