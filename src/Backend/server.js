var express = require('express');
var app = express();
var cors = require('cors');
var fs = require("fs");
var reportsData;
//enable cors
app.use(cors({origin: '*'}));

// to read json file 
fs.readFile( __dirname + "/" + "reports.json", 'utf8', function (err, data) {
    const jsonObject = JSON.parse(data)
    reportsData = jsonObject
});

// get all data from reports.json
app.get('/reports', function (req, res) {
    
    return res.status(200).json(reportsData)
})
///-- End get data --///

///--- Resolve ---///
app.put('/reports/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    
    for(var element of reportsData['elements']) {
        if (element.payload['reportId'] === req.params.id) {
            element.state = "CLOSED"
            return res.status(200).json(reportsData['elements'])
        }
    }
    return res.status(400).json({'detail': 'this id does not exist'})
 })
///--- End Resolve --- ///

//Block content
 app.put('/reports/Block/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    
    for(var element of reportsData['elements']) {
        if (element.payload['reportId'] === req.params.id) {
            element.payload['reportType'] = "Blocked"
            return res.status(200).json(reportsData['elements'])
        }
    }
    return res.status(400).json({'detail': 'this id does not exist'})
 })
///--- End Block conent --- ////

app.listen(8009, () => {
    console.log(`Example app listening at http://localhost:8009`)
  })