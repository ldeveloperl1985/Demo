var settings = require("../settings");
var db = require("../core/db");


exports.createCustomer = function (firstName, lastName, email, callback) {
    var query = 'insert into customer(firstName,lastName,email) values("' + firstName + '","' + lastName + '","' + email + '") ; SELECT * FROM customer WHERE customerId=LAST_INSERT_ID();';
    db.executeSql(query, function (err, data) {
        if (!err) {
            callback(null, data);
        } else {
            callback(err, null);
        }
    });
};

exports.getAllCustomer = function (callback) {
    var query = 'Select *  FROM customer';
    db.executeSql(query, function (err, data) {
        if (!err) {
            callback(null, data);
        } else {
            callback(err, null);
        }
    });
};

exports.getCustomerById = function (customerId, callback) {
    var query = 'Select customerId, firstName,lastName,email  FROM customer Where customerId = "' + customerId + '"';
    db.executeSql(query, function (err, data) {
        if (!err) {
            callback(null, data);
        } else {
            callback(err, null);
        }
    });
};


exports.deleteCustomer = function (customerId, callback) {
    var query = 'delete from customer WHERE  customerId ="' + customerId + '"';
    db.executeSql(query, function (err, data) {
        if (!err) {
            callback(null, data);
        } else {
            callback(err, null);
        }
    });
};


exports.updateCustomer = function (customerId, firstName, lastName, email, callback) {
    var query = 'update customer set firstName="' + firstName + '",lastName="' + lastName + '", email="' + email + '"  WHERE  customerId ="' + customerId + '"';
    db.executeSql(query, function (err, data) {
        if (!err) {
            callback(null, data);
        } else {
            callback(err, null);
        }
    });
};
