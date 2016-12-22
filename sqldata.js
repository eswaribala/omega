
var sql = require('mssql'); 

var config = {
    user: 'sa',
    password: 'vignesh',
    server: 'VIGNESHBALA', 
// You can use 'localhost instance' to connect to named instance
    database: 'CITIDB',

options: {
    encrypt: true 
// Use this if you're on Windows Azure
}


}

var connection = new sql.Connection(config, function(err) {
    // ... error checks

// Query

var request = new sql.Request(connection); 
// or: var request = connection.request();
request.query('select * from currency', function(err, recordset) {
    // ... error checks

    console.dir(recordset);
});
});
