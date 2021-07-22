var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/EmployeeDB';
var str = "";

app.route('/Employeeid').get(function (req, res) {
  console.log("inside route");
  MongoClient.connect(url, function (err, client) {
    str = "";
    console.log("connected to mongo");

    var db = client.db('EmployeeDB');

    db.collection('Employee').find({}).toArray(function (err, docs) {
      docs.forEach(function (doc) {
        if (doc != null) {
          console.log("1st itr: inside foreach loop");
          str = str + "    Employee id  " + doc.Employeeid + "</br>";
          console.log(str);
        }
      }, function (err) {
        res.send(err);
        db.close();
      }
      );
      console.log("second itr: " + str);
    res.send(str);
    });
    
  });
});

var server = app.listen(8080, () => {
  console.log("Server running at localhost:8080");
});


//     //READ
//     db.collection('Employee').find({}).toArray(function (err, docs) {
//       docs.forEach(function (doc) {
//         console.log(doc);
//       });
//       client.close();
//     });

//     // CREATE, 
//     // db.collection('Employee').insertOne({
//     //   Employeeid: 4,
//     //   EmployeeName: "NewEmployee"
//     // });

//     // UPDATE
//     // db.collection('Employee').updateOne({
//     //   "EmployeeName": "NewEmployee"
//     // }, {
//     //   $set: {
//     //       "EmployeeName": "Mohan"
//     //   }
//     // });

//     // DELETE
//     // db.collection('Employee').deleteOne(
//     //   {
//     //       "EmployeeName": "Mohan"
//     //   }
//     // );
//   });
// });