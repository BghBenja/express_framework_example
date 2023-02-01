const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/home.html'));
});

app.post('/products',bodyParser.urlencoded({extended: true}), function(req, res) {
    console.log(req.body);
});

app.listen(3000);