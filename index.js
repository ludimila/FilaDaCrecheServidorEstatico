var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression');
    
var app = express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(compression())


//server static files and send to client
app.get('/schoolsLocations.json', function (req, res) {
    res.send('Its running');
})

app.get('/demand.json', function (req, res) {
    res.send('Its running');
})

app.post('/schoolsLocations', function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=86400')
    res.send(req.body)
}) 

app.post('/demand', function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=86400')
    res.send(req.body)
}) 

app.listen(8080)