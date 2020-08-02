var express = require('express')
var app = express()

var myLogger = function(req, res, next) {
    console.log('LOGGED')
    next()
}

app.use(express.static(__dirname + '/public'));

app.get('/public', function(req, res) {
    res.render('index.html')
})

app.listen(3100)