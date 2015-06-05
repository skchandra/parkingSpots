/*"use strict";

var path = require("path");
var express = require("express");
var app = express();
var request = require("request");

var APIKEY = '76e253a5c51ecf1dbf17e9ea6b9d6a2f';
var coordArray = [];
var jsonHeader = {headers: {'Accept': "application/json"}};

app.use(express.static('./display'));

function combine(callback, fxn) {
  request('http://api.landscape-computing.com/nboxws/rest/v1/site/pa/query/summary/?key=' + APIKEY, function (error, response, body) {
    var finArray = [];
    var occ = body.split('|');

    for (var j = 0; j < occ.length; j++) {
      var sensorId = occ[j].split(":")[0];
      if (coordArray[sensorId] !== undefined) finArray.push([sensorId, coordArray[sensorId][0], occ[j].split(":")[1][1]]);
    }
    console.log(finArray);
    //fxn(finArray);
  });
}

app.get('/api/gps', function (req, resp) {
  request('http://api.landscape-computing.com/nboxws/rest/v1/zone/pa_2/?key=' + APIKEY, jsonHeader, function (error, response, body) {
    console.log('maybe');
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body).sensorId;

      for (var i = 0; i < Object.keys(data).length; i++) {
        var sensor = data[i].guid.toString();
        var coordinates = data[i].gpsCoord;
        coordArray[sensorId] = coordinates;
      }
      combine(coordinatesArray);
    } else {
      console.log(error);
    }
  });
});

app.get('/', function(req, resp){
  resp.sendFile(path.join('/display/index.html'));
});

app.listen(process.env.PORT || 3000);*/

"use strict";

var path = require("path");
var express = require("express");
var app = express();
var request = require("request");

var APIKEY = '76e253a5c51ecf1dbf17e9ea6b9d6a2f';
var coordinatesArray = [];
var jsonHeader = {headers: {'Accept': "application/json"}};

app.use(express.static('./display'));

function occupancyCall(ca, fn) {
  request('http://api.landscape-computing.com/nboxws/rest/v1/site/pa/query/summary/?key=' + APIKEY, function (error, response, body) {
    var finArray = [];
    var occ = body.split('|');

    for (var j = 0; j < occ.length; j++) {
      var sensorId = occ[j].split(":")[0];
      if (coordinatesArray[sensorId] !== undefined) finArray.push([sensorId, coordinatesArray[sensorId][0], occ[j].split(":")[1][1]]);
    }
    console.log(finArray);
    fn(finArray);
  });
}

//routes 

app.get('/api/gps', function (req, res) {
  request('http://api.landscape-computing.com/nboxws/rest/v1/zone/pa_2/?key=' + APIKEY, jsonHeader, function (err, response, body) {
    /*api call to retrieve coordinate data on sensors in palo alto zone*/

    if (!err && response.statusCode === 200) {
      var data = JSON.parse(body).sensorId;

      for (var i = 0; i < Object.keys(data).length; i++) {
        var coordinates = data[i].gpsCoord;
        var sensorId = data[i].guid.toString();
        coordinatesArray[sensorId] = coordinates;
      }
      occupancyCall(coordinatesArray, function (array) {
          res.send(array); //send array containing sensorId, coordinates and occupancy boolean
      });

    } else {
      console.log(err);
    }
  });
});

app.get('/', function (req, res){
  res.sendFile(path.join('/index.html'));
});

app.listen(process.env.PORT || 3000);