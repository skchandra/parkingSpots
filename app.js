var path = require("path");
var express = require("express");
var app = express();
var request = require("request");
var APIKEY = '76e253a5c51ecf1dbf17e9ea6b9d6a2f';
var coordArray = [];

function combine(callback, fxn) {
  request('http://api.landscape-computing.com/nboxws/rest/v1/site/pa/query/summary/?key=' + APIKEY, function (error, response, body) {
  
  });
}

app.get('/api/gps', function (req, resp) {
  request('http://api.landscape-computing.com/nboxws/rest/v1/zone/pa_2/?key=' + APIKEY, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      if (body.charAt(0) === "<") {
        sensor = ;
        coordinates = ;
        coordArray[sensor] = coordinates;
      } else {
        data = JSON.parse(body).sensorId;

        for (var i = 0; i < ; i++) {
          sensor = data[i]["guid"];
          coordinates = data[i]["gpsCoord"];
          coordArray[sensor] = coordinates;
        }
      }
    } else {
      return console.log(error);
    }
    combine(coordArray);
  } 
});

app.listen(process.env.PORT) || 8080;