
var unirest = require("unirest");

var req = unirest("GET", "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e1db0101cd26442c8c1bb435a5363f7c");



req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});

/*
var unirest = require('unirest');
var express = require('express');
var app = express();
app.get('/', function(req, res){
    unirest.get("https://community-open-weather-map.p.rapidapi.com/weather")
      .header("X-RapidAPI-Key", "a2566ca556msh1125c83d73f709fp1eb3ccjsn9e6fa18a36ad")
      .header("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com")
      .query({
            'appid': "2172797",
            'lon': '12.4924',
            'lat': '41.8902',
            'units': 'metric',
            'mode': 'html'
      })
      .end(function (result) {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(result.body);
            console.log(result.body);
      });
    })
    app.listen(8081, function(){
      console.log('Server running at https://127.0.0.1:8081/');
    })
    */