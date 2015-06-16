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
  request('http://api.landscape-computing.com/nboxws/rest/v1/site/lg/query/summary/?key=' + APIKEY, function (error, response, body) {
    var finArray = [];
    var occ = body.split('|');

    for (var j = 0; j < occ.length; j++) {
      var sensorId = occ[j].split(":")[0];
      if (coordinatesArray[sensorId] !== undefined) finArray.push([sensorId, coordinatesArray[sensorId][0], occ[j].split(":")[1][1]]);
    }
    fn(finArray);
  });
}

app.get('/api/gps', function(req, res){
  request('http://api.landscape-computing.com/nboxws/rest/v1/zone/lg_1/?key=' + APIKEY, {headers: {'Accept': "application/json"}}, function (err, response, body) {
    /*api call to retrieve coordinate data on sensors in palo alto zone*/
      if (!err && response.statusCode == 200) {
        //parse through JSON object
      try { var result = JSON.parse(body).sensorId;
        for (var i = 0; i < Object.keys(result).length; i++){
          var coordinates = result[i].gpsCoord;
          var sensorId = result[i].guid.toString();
          coordinatesArray[sensorId] = coordinates;
        }

        //make a second API call to retrieve parking occupancy data
        occupancyCall(coordinatesArray, function(array){
          res.send(array); //send array containing sensorId, coordinates and occupancy boolean
        });
      } catch (err) {
        console.log(err);
      }
    } else {
        console.log(err);
      }
  });
});

app.get('/api/gps1', function(req, res){
  request('http://api.landscape-computing.com/nboxws/rest/v1/zone/lg_2/?key=' + APIKEY, {headers: {'Accept': "application/json"}}, function (err, response, body) {
    /*api call to retrieve coordinate data on sensors in palo alto zone*/
      if (!err && response.statusCode == 200) {
        //parse through JSON object
      try { var result = JSON.parse(body).sensorId;
        for (var i = 0; i < Object.keys(result).length; i++){
          var coordinates = result[i].gpsCoord;
          var sensorId = result[i].guid.toString();
          coordinatesArray[sensorId] = coordinates;
        }

        //make a second API call to retrieve parking occupancy data
        occupancyCall(coordinatesArray, function(array){
          res.send(array); //send array containing sensorId, coordinates and occupancy boolean
        });
      } catch (err) {
        console.log(err);
      }
    } else {
        console.log(err);
      }
  });
});

app.get('/api/gps2', function(req, res){
  request('http://api.landscape-computing.com/nboxws/rest/v1/zone/lg_3/?key=' + APIKEY, {headers: {'Accept': "application/json"}}, function (err, response, body) {
    /*api call to retrieve coordinate data on sensors in palo alto zone*/
      if (!err && response.statusCode == 200) {
        //parse through JSON object
      try { var result = JSON.parse(body).sensorId;
        for (var i = 0; i < Object.keys(result).length; i++){
          var coordinates = result[i].gpsCoord;
          var sensorId = result[i].guid.toString();
          coordinatesArray[sensorId] = coordinates;
        }

        //make a second API call to retrieve parking occupancy data
        occupancyCall(coordinatesArray, function(array){
          res.send(array); //send array containing sensorId, coordinates and occupancy boolean
        });
      } catch (err) {
        console.log(err);
      }
    } else {
        console.log(err);
      }
  });
});

app.get('/api/gps3', function(req, res){
  request('http://api.landscape-computing.com/nboxws/rest/v1/zone/lg_4/?key=' + APIKEY, {headers: {'Accept': "application/json"}}, function (err, response, body) {
    /*api call to retrieve coordinate data on sensors in palo alto zone*/
      if (!err && response.statusCode == 200) {
        //parse through JSON object
      try { var result = JSON.parse(body).sensorId;
        for (var i = 0; i < Object.keys(result).length; i++){
          var coordinates = result[i].gpsCoord;
          var sensorId = result[i].guid.toString();
          coordinatesArray[sensorId] = coordinates;
        }

        //make a second API call to retrieve parking occupancy data
        occupancyCall(coordinatesArray, function(array){
          res.send(array); //send array containing sensorId, coordinates and occupancy boolean
        });
      } catch (err) {
        console.log(err);
      }
    } else {
        console.log(err);
      }
  });
});

app.get('/', function (req, res){
  res.sendFile(path.join('/index.html'));
});

app.listen(process.env.PORT || 3000);