var express = require('express'),
    fs = require('fs'),
    bodyParser = require('body-parser');
    
//receive from airflow later
var  schoolsLocationsFile = './schoolsLocations.json'
var demandFile = './demand.json'

//read static files - schools locations
var resultJsonSchoolsLocation = ''
fs.readFile(schoolsLocationsFile, 'utf8', function(err, contents) {
    if (err) throw err
    resultJsonSchoolsLocation = JSON.parse(contents)
}) 
 
 //read static files - demand
 var resultJsonDemand = ''
fs.readFile(demandFile, 'utf8', function(err, contents) {
    if (err) throw err
    resultJsonDemand = JSON.parse(contents)
}) 

var app = express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//test if server is running ok - delete later
app.post('/schoolsLocations', function (req, res) {
    res.send(req.body)
}) 

//server static files and send to client
app.get('/schoolsLocations.json', function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=86400')
    res.json(resultJsonSchoolsLocation)
})

app.get('/demand.json', function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=86400')
    res.json(resultJsonDemand)
})


app.listen(8080)

console.log('Servidor rodando')