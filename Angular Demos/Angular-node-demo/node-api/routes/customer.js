var express = require('express');
var router = express.Router();
var customerController = require("../controller/customerController");
var settings = require("../settings");

router.post(settings.customer, function (req, res) {


    var firstName = req.body.firstName;
    var lastName  = req.body.lastName;
    var email     = req.body.email;


    if (firstName == "" || firstName == undefined) {
        var result = {
            status: '0',
            msg: 'First Name is required.'
        };
        res.status(200).json(result);
        return;
    }

    if (lastName == "" || lastName == undefined) {
        var result = {
            status: '0',
            msg: 'Last Name is required.'
        };
        res.status(200).json(result);
        return;
    }

    if (email == "" || email == undefined) {
        var result = {
            status: '0',
            msg: 'Email is required.'
        };
        res.status(200).json(result);
        return;
    }

    customerController.createCustomer(firstName, lastName, email, function (err, data) {
        if (err) {
            var result = {
                status: '0',
                msg: 'There was an error reporting your issue.'
            };
            res.status(500).json(result);
            return;
        } else {
            res.status(200).json(data[1]);
        }
    });
});


router.get(settings.customer + '/:id', function (req, res) {
    var customerId = req.params.id;
    if (customerId == "" || customerId == undefined) {
        var result = {
            status: '0',
            msg: 'Customer id is required.'
        };
        res.status(200).json(result);
        return;
    }

    customerController.getCustomerById(customerId, function (err, data) {
        if (err) {
            var result = {
                status: '0',
                msg: err
            };
            res.status(500).json(result);
            return;
        } else {
            if (data.length > 0) {
                res.status(200).json(data);
            } else {
                var result = {
                    status: '400',
                    msg: 'Customer is not found.'
                };
                res.status(400).json(result);
            }
        }
    });
});

router.get(settings.customer, function (req, res) {

    customerController.getAllCustomer(function (err, data) {
        if (err) {
            var result = {
                status: '0',
                msg: err
            };
            res.status(500).json(result);
            return;
        } else {
            if (data.length > 0) {
                res.status(200).json(data);
            } else {
                var result = {
                    status: '400',
                    msg: 'No records found'
                };
                res.status(400).json(result);
            }
        }
    });
});


router.delete(settings.customer, function (req, res) {
    var customerId = req.body.customerId;
    console.log("---------DELETE-------------");
    console.log("customerId==> " + customerId);

    if (customerId == "" || customerId == undefined) {
        var result = {
            status: '0',
            msg: 'Customer id is required.'
        };
        res.status(200).json(result);
        console.log("result==> " + result);
        return;
    }

    customerController.deleteCustomer(customerId, function (err, data) {
        if (err) {
            var result = {
                status: '0',
                msg: 'There was an error reporting your issue.'
            };
            res.status(500).json(result);
            console.log("result==> " + JSON.stringify(result));
            return;
        } else {

            if (data.affectedRows > 0) {
                var result = {
                    "status": "200",
                    "msg": "ok"
                };
                res.status(200).json(result);
                console.log("result==> " + JSON.stringify(result));
            } else {
                var result = {
                    status: '400',
                    msg: 'Customer is not found.'
                };
                res.status(400).json(result);
                console.log("result==> " + JSON.stringify(result));
            }

        }

    });
});


router.put(settings.customer, function (req, res) {
    var customerId = req.body.customerId;
    var firstName = req.body.firstName;
    var lastName  = req.body.lastName;
    var email     = req.body.email;

  customerController.updateCustomer(customerId, firstName,lastName,email, function (err, data) {
        if (err) {
            var result = {
                status: '0',
                msg: 'There was an error reporting your issue.'
            };
            res.status(500).json(result);
            console.log("result==> " + JSON.stringify(result));
            return;
        } else {

            if (data.affectedRows > 0) {
                var result = {
                    "status": "200",
                    "msg": "ok"
                };
                res.status(200).json(result);
                console.log("result==> " + JSON.stringify(result));
            } else {
                var result = {
                    status: '400',
                    msg: 'Customer is not found.'
                };
                res.status(400).json(result);
                console.log("result==> " + JSON.stringify(result));
            }

        }

    });
});
module.exports = router;
