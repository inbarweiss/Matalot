/**
 * Created by inbar on 13/05/2017.
 */
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://127.0.0.1:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    db.collection("messages").drop();
    assert.equal(null, err);
    console.log("Connected successfully to server");
    var fs = require("fs");
    fs.readFile('message1.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        var json = JSON.parse(data);
        db.collection('messages').insertOne(json, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection.");
     //       callback();
        });
        /*db.configurations.insert(json, function (err, doc) {
            console.log(data);
            if (err) throw err;
        });*/
    });
    fs.readFile('message2.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        var json = JSON.parse(data);
        db.collection('messages').insertOne(json, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection.");
            //       callback();
        });
        /*db.configurations.insert(json, function (err, doc) {
         console.log(data);
         if (err) throw err;
         });*/
    });
    fs.readFile('message3.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        var json = JSON.parse(data);
        db.collection('messages').insertOne(json, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection.");
            //       callback();
        });
        /*db.configurations.insert(json, function (err, doc) {
         console.log(data);
         if (err) throw err;
         });*/
    });
    fs.readFile('message4.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        var json = JSON.parse(data);
        db.collection('messages').insertOne(json, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection.");
            //       callback();
        });
        /*db.configurations.insert(json, function (err, doc) {
         console.log(data);
         if (err) throw err;
         });*/
    });
    fs.readFile('message5.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        var json = JSON.parse(data);
        db.collection('messages').insertOne(json, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection.");
            //       callback();
        });
        /*db.configurations.insert(json, function (err, doc) {
         console.log(data);
         if (err) throw err;
         });*/
    });

    setTimeout(function(){
        console.log( db.collection("messages").find().toString());
        db.close();
    console.log("closed conn");},5000);
});