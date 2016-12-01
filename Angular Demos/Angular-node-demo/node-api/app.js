var http = require("http");
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var server = require('http').Server(app);
var settings = require("./settings");
var cors = require('cors');

//routes
var routesIndex = require('./routes/index');
var routesCustomer = require('./routes/customer');

app.set('port', process.env.PORT || settings.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('development', function () {
    app.use(express.errorHandler());
});

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//All Routes
app.use('/', routesIndex);
app.use('/', routesCustomer);

server.listen(settings.port, function () {
    console.log('-------------------------------------------------------------------');
    console.log('Server started successfully!, Open this URL ' + settings.baseURL);
    console.log('-------------------------------------------------------------------');
});
