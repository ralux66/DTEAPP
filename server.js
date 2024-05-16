'use strict'

var express = require('express');

var app = express();
app.use(express.static(__dirname + '/dist/emisor-dteapp'));

app.get('/*', function (req, res) {
    resp.sendFile(__dirname + '/dist/emisor-dteapp/index.html');
    //res.send('Hello World');
});

/* istanbul ignore next */
/* if (!module.parent) { */
app.listen(process.env.PORT || 8080);
//console.log('Express started on port 3000');
/* } */