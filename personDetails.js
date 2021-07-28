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

// var Img = require('./ImgModel');
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ImgSchema = new Schema(
    {
        img: {
            data: Buffer,
            contentType: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Img', ImgSchema);
//

const fs = require('fs');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'uploads/')
  }
});

const upload = multer({ storage: storage });
app.route('/img_data')
  .post(upload.single('file'), function (req, res) {

    var new_img = new Img;
    new_img.img.data = fs.readFileSync(req.file.path)
    new_img.img.contentType = 'image/jpeg';
    new_img.save();
    res.json({ message: 'New image added to the db!' });
  })
//   .post('/', upload.single('file'), (req, res, next) => {
 
//     var obj = {
//         name: req.body.name,
//         desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.path)),
//             contentType: 'image/jpeg'
//         }
//     }
//     imgModel.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/');
//         }
//     });
// })
  .get(function (req, res) {
    Img.findOne({}, 'img createdAt', function (err, img) {
      if (err)
        res.send(err);
      console.log(img);
      res.contentType('json');
      res.send(img);
    }).sort({ createdAt: 'desc' });
  });








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
      Phone: req.body.Contact,
      Email: req.body.Email
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
    var arr = [];

    db.collection('PersonDetails').updateOne({
      Email: req.body.Email //basically any primary key
    }, {
      $set: {
        FirstName: req.body.UFname,
        LastName: req.body.ULname,
        Address: req.body.UAddress,
        Phone: req.body.UContact,
        Email: req.body.UEmail
      }
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
        Email: req.body.email
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
