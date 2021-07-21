// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 4000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   // res.setHeader('Access-Control-Allow-Origin', '*');
//   // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://127.0.0.1:27017/EmployeeDB';

// MongoClient.connect(url, function(err, db) {

//     var cursor = db.collection('Employee').find();

//     cursor.each(function(err, doc) {

//         console.log(doc);
//         // db.close();
//     });
// }); 

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/EmployeeDB';

MongoClient.connect(url, function(err, client) {
    var db = client.db('EmployeeDB');
  //   var cursor = db.collection('Employee').find();
  //   cursor.forEach(function(err, doc) {
  //     console.log(doc);
  // });

  db.collection('Employee').find({}).toArray(function(err, doc) {
      doc.forEach(function(doc) {
        console.log(doc);
      });
    client.close();
    });

    // cursor.each(function(err, doc) {

    //     console.log(doc);
    //     // db.close();
    // });
}); 

//first name
//last name
// address
// phone contact

//using mongo and