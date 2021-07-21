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

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/EmployeeDB';

MongoClient.connect(url, function(err, client) {
    var db = client.db('EmployeeDB');
    
//read
    db.collection('Employee').find({}).toArray(function(err, docs) {
        docs.forEach(function(doc) {
          console.log(doc);
        });
      client.close();
    });

// create, 
      // db.collection('Employee').insertOne({
      //   Employeeid: 4,
      //   EmployeeName: "NewEmployee"
      // });


// update
        // db.collection('Employee').updateOne({
        //   "EmployeeName": "NewEmployee"
        // }, {
        //   $set: {
        //       "EmployeeName": "Mohan"
        //   }
        // });


// delete
          // db.collection('Employee').deleteOne(

          //   {
          //       "EmployeeName": "Mohan"
          //   }

          // );


}); 


