var rout=require('express').Router();
var path= require('path');
var bcy=require('bcrypt');
var nm=require('nodemailer');
var randtoken=require('rand-token')
const saltRounds = 10;
var md = require('markdown-it')();
md.render('# markdown-it rulezz!');
require('dotenv').config()
var bodyParser=require('body-parser');
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
app=express();
app.set('view engine','ejs');
app.set('views',path.join("views"));
let usersch=require('../models/user.model');
let tksc=require('../models/token.model');
let blogsc = require('../models/blog.model');
let cms=require('../models/comment.model')
rout.route('/:id').get((req,res)=>{
    if(req.session.user){
        blogsc.findById(req.params.id).then(data1=> {
            cms.find({blgid:req.params.id}).then(data=>{
                res.render('blgview',{b:md.render(data1.blog),c:"<button>ADD POST</button>",obid:req.params.id,dd:data})
            })
        })
    
}
    else{
        
        blogsc.findById(req.params.id).sort({daten:-1}).then(data1=> {
            cms.find({blgid:req.params.id}).then(data=>{
         res.render('blgview',{b:md.render(data1.blog),c:'<a href="/">SIGNIN TO COMMENT</a>',obid:'_',dd:data})})})
    }
});

rout.route('/addcomment').post((req,res)=>{
    const d=new cms();
    d.blgid=req.body.obid;
    d.comment=req.body.name;
    d.comentator=req.session.user.realname;
    d.save((err,docs)=>{
        if(docs){
            console.log("sucess")
            res.redirect('back')
        }
        else{
            console.log("failure")
        }
    })
});



module.exports=rout;
