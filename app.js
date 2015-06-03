var path = require("path");
var express = require("express");
var app = express();
var request = require("request");
var APIKEY = '76e253a5c51ecf1dbf17e9ea6b9d6a2f';

app.get('/', function (req, resp) {
  resp.send('hello world');
});

app.listen(3000);