var express=require('express');
var app=express();
var path=require('path');
//=====mongodb client=====
const MongoClient = require('mongodb').MongoClient;
//===getting the id of the object in the mongodb===
const objectId=require('mongodb').ObjectID;
var mongoose=require('mongoose');
var assert=require('assert'); //for error checking

var morgan=require('morgan');
//=======change the pasword in * form====
var bycryptnode=require('bcrypt-nodejs');
var db = mongoose.connection;
//=====converting the json fiel=====
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var URL=('mongodb://localhost:27017/loginform');
const Users = require('./models/models');
//======get the login page======
var adminroute=express.Router();
adminroute.get('/',function (req,res) {
    res.sendFile(path.join(__dirname +'/crud.html'));
});
adminroute.get('/updatefunc',function(req,res){
    res.sendFile(path.join(__dirname + '/update.html'))
});
adminroute.get('/deletefunc',function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'))
});
adminroute.get('/createfunc',function(req,res){
    res.sendFile(path.join(__dirname + '/create.html'))
});
adminroute.get('/readfunc',function(req,res){
    res.sendFile(path.join(__dirname + '/get.html'))
});
//=======GET============================
app.get('/get',function (req,res) {
    const loginformfill = []; // DECLARING AN ARRAY

    MongoClient.connect('mongodb://localhost:27017/savedata', function (err, db){      //CONNECTING TO MONGODB
        if (err) throw err;
        const db1 = db.db('savedata');      // POINTING TO OUR DATABASE
        const logindata = db1.collection('logins').find({}); // POINTING TO OUR COLLECTION IN DB, AND GETTING DATA FROM THAT COLLECTION

        console.log(logindata); // DATA IS STORED IN 'loginform'

        logindata.forEach(function (doc, err) {     //saving data into an array using a loop
            if (err) throw err;
            loginformfill.push(doc);    //pushing into array one by one
            },  function() {
            db.close();
            res.json(loginformfill);    //Showing the data saved in array in JSON format
            }); // STORING DATA IN AN ARRAY USING LOOP AND SHOWING IT IN 'JSON' FORMAT
        });
    });
//=======adding data in mongodb======
app.post('/addname',function (req,res) {
    //var savedatafile=[];
    //MongoClient.connect('mongodb://localhost:27017/savedata', function (err, db) {
    mongoose.connect('mongodb://localhost:27017/savedata');
        console.log('hello im here');
       // if (err) throw err;

        var mydata = new Users(req.body);
        console.log(mydata);
     //   var mydb=db.db('savedata');
       // mydata.forEach(function (doc,err) {
         //  if (err) throw err;
             mydata.name = req.body.name;
             mydata.email = req.body.email;
             mydata.age = req.body.age;
           mydata.save();
            res.json('hello task completed');

});
//==========UPDATE===========
app.post('/update',function (req, res) {
var item={
    name:req.body.name,
    email:req.body.email,
    age:req.body.age
};
    MongoClient.connect('mongodb://localhost:27017/savedata', function (err, db) {
        if (err) throw err;
            var db1=db.db('savedata');
             console.log(item);
        db1.collection('logins').updateOne({_id:objectId(req.body.id)},{$set:item},function (err,result) {
            if (err) throw err;
            res.send('updated');
    });
});
});
//==========DELETE=========
app.post('/delete',function (req,res) {
    MongoClient.connect(URL,function (err,db) {
        if (err) throw err;
var db1=db.db('savedata');
db1.collection('logins').removeOne({_id:objectId(req.body.id)},function (err,result) {
    if (err)throw err;
    res.send('deleted');
});
    });
});
app.use('/login',adminroute);
app.listen(8080);
console.log('server is going to start');