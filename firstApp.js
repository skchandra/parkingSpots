"use strict";

var path = require("path");
var express = require("express");
var app = express();
var request = require("request");

var APIKEY = '76e253a5c51ecf1dbf17e9ea6b9d6a2f';
var coordArray = [];
var jsonHeader = {headers: {'Accept': "application/json"}};
var finArray = [];

app.use(express.static('./visual'));

function combine(callback, fxn) {
  request('http://api.landscape-computing.com/nboxws/rest/v1/site/pa/query/summary/?key=' + APIKEY, function (error, response, body) {
    var occ = body.split('|');

    for (var j = 0; j < occ.length; j++) {
      var sensorId = occ[j].split(":")[0];
      if (coordArray[sensorId] !== undefined) {
        finArray.push([sensorId, coordArray[sensorId][0], occ[j].split(":")[1][1]]);
      }
    }
    console.log(finArray);
  });
}

app.get('/api/gps', function (req, resp) {
  request('http://api.landscape-computing.com/nboxws/rest/v1/zone/pa_2/?key=' + APIKEY, jsonHeader, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body).sensorId;

      for (var i = 0; i < Object.keys(data).length; i++) {
        var sensor = data[i].guid;
        var coordinates = data[i].gpsCoord;
        coordArray[sensor] = coordinates;
      }
      combine(coordArray);
    } else {
      return console.log(error);
    }
  });
});

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/visual/index.html'));
});

app.listen(process.env.PORT || 3000);