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
app.use(bodyParser.json())

//test if server is running ok - delete later
app.post('/', function (req, res) {
   res.send('POST request to homepage');
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

app.post('/schoolsLocations', function(req, res){
    console.log(req.body)
    res.send(req.body)
})

app.listen(8080)