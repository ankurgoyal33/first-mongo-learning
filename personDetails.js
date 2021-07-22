var express = require('express');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var url = 'mongodb://127.0.0.1:27017/PersonDetailsDB';
var str = "";
app.use(cors({
  origin: '*'
}));
app.use(express.json());

//     //READ
//     db.collection('Employee').find({}).toArray(function (err, docs) {
//       docs.forEach(function (doc) {
//         console.log(doc);
//       });
//       client.close();
//     });
app.route('/PersonDetailsRead').get(function (req, res) {
  console.log("inside READ");
  MongoClient.connect(url, function (err, client) {
    str = "";
    console.log("connected to READ mongo");

    var db = client.db('PersonDetailsDB');

    db.collection('PersonDetails').find({}).toArray(function (err, docs) {
      docs.forEach(function (doc) {
        if (doc != null) {
          str = str + "    First_Name:  " + doc.FirstName
            + "    Last_Name:  " + doc.LastName
            + "    Address:  " + doc.Address
            + "    Contact:  " + doc.Phone
            + "</br>";
        }
      }, function (err) {
        res.send(err);
        db.close();
      }
      );
      res.send(str);
    });

  });
});

//     REATE, 
//     // db.collection('Employee').insertOne({
//     //   Employeeid: 4,
//     //   EmployeeName: "NewEmployee"
//     // });
app.route('/PersonDetailsCreate').post(function (req, res) {
  console.log("inside CREATE route");
  MongoClient.connect(url, function (err, client) {
    console.log("connected to CREATE mongo");

    var db = client.db('PersonDetailsDB');
    db.collection('PersonDetails').insertOne({
      FirstName: req.body.Fname,
      LastName: req.body.Lname,
      Address: req.body.Address,
      Phone: req.body.Contact
    });
    res.send("successfully added to DB");
  });
});

// UPDATE
// db.collection('Employee').updateOne({
//   "EmployeeName": "NewEmployee"
// }, {
//   $set: {
//       "EmployeeName": "Mohan"
//   }
// });
app.route('/PersonDetailsUpdate').post(function (req, res) {
  console.log("inside UPDATE route");
  MongoClient.connect(url, function (err, client) {
    console.log("connected to UPDATE mongo");
    var db = client.db('PersonDetailsDB');

    db.collection('PersonDetails').updateOne({
      FirstName: req.body.Fname
    }, {
      $set: {
        FirstName: req.body.Uname
      }
    });
    res.send("successfully updated in DB");
  });
});

//  DELETE
// db.collection('Employee').deleteOne(
//   {
//       "EmployeeName": "Mohan"
//   }
// );
app.route('/PersonDetailsDelete').post(function (req, res) {
  console.log("inside DELETE route");
  MongoClient.connect(url, function (err, client) {
    console.log("connected to DELETE mongo");
    var db = client.db('PersonDetailsDB');
    db.collection('PersonDetails').deleteOne(
      {
        FirstName: req.body.Fname
      }
    );
    res.send("successfully deleted from DB");
  });
});

var server = app.listen(8090, () => {
  console.log("Server running at localhost:8090/");
});
