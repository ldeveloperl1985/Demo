var express = require('express');
var router = express.Router();
var settings = require("../settings");
var customerController = require("../controller/customerController");

router.get('/', function (req, res) {
    var result = {
        "status": "200",
        "api": "Node API"
    };
    res.status(200).json(result);
});

module.exports = router;
