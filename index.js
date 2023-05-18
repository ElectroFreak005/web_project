const { urlencoded } = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
var session = require('express-session');
var cookieParser = require('cookie-parser');
const port = 3000;

mongoose.connect(
    "mongodb+srv://nat005005:3698@cluster0.vsmiuee.mongodb.net/football", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("connected to mongo")
})
.catch((error) => {
    console.error(error);
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    age: Number
});

const playerlist = new mongoose.Schema({
    name: String,
    position: String,
    value : Number
})

const userModel = mongoose.model("user",userSchema);
const playerlistModel = mongoose.model("player_list",playerlist);

var app = express();
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res) => {
    res.render("index",{name:"Football"});
})

app.get("/login",(req,res) => {
    res.render("login");
})

app.post("/login",(req,res) => {
    userModel.find({email:req.body.email})
    .then((result) => {
        reqpass = result[0].password
        console.log(typeof(reqpass))
        console.log(req.body)
        console.log(req.body.pwd)
        if(reqpass === req.body.pwd){
            console.log("password matched");
            req.session.user = result[0];
            console.log(`login session ${req.session.user}`)
            console.log("verified")
            res.redirect("/mainpage")
        }
    })
    .catch((error) => {
        res.status(500).json(error)
    })
})

app.get("/signup",(req,res) => {
    res.render("signup");
})

app.post("/signup",(req,res) => {
    async function createUser(){
        userModel.find({email:req.body.email})
        .then(async (result) => {
            if(result.length > 0){
                console.log("user already Exists")
                res.redirect("/login")
                return;
            }
        })
        .catch((error) => {
            res.status(500).json(error)
            return;
        })
        const newUser = new userModel({
            name:req.body.name,
            email:req.body.email,
            password:req.body.pwd,
            age:req.body.age
        })
        try {
            await newUser.save();
            console.log('User saved successfully.');
            res.redirect("/login");
          }
          catch (err) {
            console.error(err);
          }
    }
    createUser();
})

app.get("/contactus",(req,res) => {
    res.render("contactus");
})

app.get("/mainpage",(req,res) => {
    console.log(`mainpage session ${req.session.user}`)
    res.render("mainpage",{user:req.session.user});
})

app.get("/signout", (req,res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/login");
        }
    })
})

app.get("/checkmongo",(req,res) =>{
    userModel.find()
    .then((result) => {
        res.json(result);
    })
    .catch((error) => {
        res.status(500).json({Error:'No record founds.'});
    })
})

app.post("/submit", (req,res) => {
    console.log(req.body.gk)
    plist = []
    for(let i = 0; i < req.body.length; i++){
        plist[i] = req.body[i];
    }
    var v = req.body.gk;
    console.log(v.name)
    res.send(req.body);
})

app.get("/playerlist", (req,res) => {
    console.log(req.originalUrl);
    var plist =[{}]
    playerlistModel.find()
    .then((result) => {
        // console.log(result)
        res.json(result);
    })
})

app.listen(3000);