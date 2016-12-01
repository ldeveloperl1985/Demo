exports.dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    multipleStatements: true
}


// If you want to change the port change in /public/swagger/index.html - "  discoveryUrl: "http://localhost:5053/api-docs.json","for swagger UI
exports.port = "5053"
exports.baseURL = "http://localhost:" + exports.port;

//Endpoint Declaration
exports.customer = "/api/customer"

