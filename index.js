const express = require("express");
const mongoose = require("mongoose");
const port = 3000;

mongoose.connect(
    "mongodb+srv://nat005005:3698@cluster0.vsmiuee.mongodb.net/football", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);


var app = express();
app.set('view engine','ejs');
app.use(express.static("public"));

app.get("/",(req,res) => {
    res.render("index",{name:"Football"});
})

app.get("/login",(req,res) => {
    res.render("login");
})

app.get("/signup",(req,res) => {
    res.render("signup");
})

app.get("/contactus",(req,res) => {
    res.render("contactus");
})

app.get("/mainpage",(req,res) => {
    res.render("mainpage");
})

app.listen(3000);