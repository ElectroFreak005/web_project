const { urlencoded } = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
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
    name: String,
    email: String,
    password: String,
    age: Number
});

const userModel = mongoose.model("user",userSchema);

var app = express();
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
        console.log(req.body.pwd)
        if(reqpass === req.body.pwd){
            console.log("verified")
            res.redirect("/mainpage")
        }
    })
    .catch((error) => {
        res.status(500).json("email not matching.")
    })
})

app.get("/signup",(req,res) => {
    res.render("signup");
})

app.post("/signup",(req,res) => {
    async function createUser(){
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
          } catch (err) {
            console.error(err);
          }
    }
    createUser();
})

app.get("/contactus",(req,res) => {
    res.render("contactus");
})

app.get("/mainpage",(req,res) => {
    res.render("mainpage");
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

app.listen(3000);