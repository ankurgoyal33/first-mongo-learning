var express = require('express');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
// var mongodb = require("mongodb");
// var ObjectID = require('mongodb').ObjectID;

var app = express();
var url = 'mongodb://127.0.0.1:27017/PersonDetailsDB';
var str = [];
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
    str = [];
    var arr = [];
    console.log("connected to READ mongo");

    var db = client.db('PersonDetailsDB');
    // console.log("test1: " + db.collection('PersonDetails').find({}));
    // var retObj = db.collection('PersonDetails').find({});
    // res.send(JSON.stringify(retObj));
    // res.send(retObj);

    // console.log("test2: " + db.collection('PersonDetails').find({}).toArray());
    db.collection('PersonDetails').find({}).toArray(function (err, docs) {
      docs.forEach(function (doc) {
        if (doc != null) {
          // str.push({"FirstName":doc.FirstName},{"LastName":doc.LastName},{"Address":doc.Address},{"Contact":doc.Phone});
          // console.log("test2: "+ str);

          // str.push({"LastName":doc.LastName});
          // str.push({"Address":doc.Address});
          // str.push({"Contact":doc.Phone});

          // str += "FirstName:  " + doc.FirstName
          //     + "LastName:  " + doc.LastName
          //     + "Address:  " + doc.Address
          //     + "Contact:  " + doc.Phone
          //     + "</br>";

          arr.push(doc);
          // console.log("test3: "+ arr);
        }
      }, function (err) {
        res.send(err);
        db.close();
      }
      );
      // res.send(arr);
      res.send(JSON.stringify(arr));

    });

  });
});

//     CREATE, 
//     // db.collection('Employee').insertOne({
//     //   Employeeid: 4,
//     //   EmployeeName: "NewEmployee"
//     // });
app.route('/PersonDetailsCreate').post(function (req, res) {
  console.log("inside CREATE route");
  MongoClient.connect(url, function (err, client) {
    console.log("connected to CREATE mongo");
var arr = [];
    var db = client.db('PersonDetailsDB');
    db.collection('PersonDetails').insertOne({
      FirstName: req.body.Fname,
      LastName: req.body.Lname,
      Address: req.body.Address,
      Phone: req.body.Contact
    });
    db.collection('PersonDetails').find({}).toArray(function (err, docs) {
      docs.forEach(function (doc) {
        if (doc != null) {
          arr.push(doc);
        }
      }, function (err) {
        res.send(err);
        db.close();
      }
      );
      res.send(JSON.stringify(arr));
    });
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
  // console.log("restubg: " + req.body.id);
  // console.log(JSON.stringify(req.body, null, 2))
  var arr = [];

  MongoClient.connect(url, function (err, client) {
    console.log("connected to DELETE mongo");
    var db = client.db('PersonDetailsDB');
    // var id_to_be_deleted  = "ObjectId(\""+req.body.id+"\")";
    // console.log(id_to_be_deleted);
    // var delete_id = req.body.id;
    db.collection('PersonDetails').deleteOne(
      {
        // _id: delete_id.toString()
        FirstName: req.body.f_name
      }
    );
    db.collection('PersonDetails').find({}).toArray(function (err, docs) {
      docs.forEach(function (doc) {
        if (doc != null) {
          arr.push(doc);
        }
      }, function (err) {
        res.send(err);
        db.close();
      }
      );
      res.send(JSON.stringify(arr));
    });
    // res.send("successfully deleted from DB");
  });
});

var server = app.listen(8090, () => {
  console.log("Server running at localhost:8090/");
});
