var mon=require('mongoose');
var express=require('express');
require('dotenv').config()
var path=require('path');
var bodyParser=require('body-parser');
app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,"views"));
const blogsc = require('./models/blog.model');
let usersch=require('./models/user.model');
mon.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true }).then(err =>{
    console.log("err");
});

mon.connection.once("open", (err)=>{
    console.log("mongodb connected")
});
const feedroute=require('./route/feed.js');
const userroute=require('./route/use.js');

app.get('/',(req,res)=>
{
    if(req.session.user) 
    {
         
        blogsc.find({}).then(data=>{
            usersch.find({}).then(data1=>{
                res.render('main',{dash:'<li class="nav-item"><a class="nav-link" href="/user/u">Dashboard</a></li>',users:data1.length,blogdata:data});
            })
           })  
             
            
    }
    else{
        blogsc.find({}).then(data=>{
            usersch.find({}).then(data1=>{
        res.render('main',{dash: '<li class="nav-item"><a class="nav-link" href="/user">Register</a></li><li class="nav-item"><a class="nav-link" href="/user/login">Login</a></li>',
        users:data1.length,blogdata:data}); })
    })  
       
    }
});
app.use('/user',userroute);
app.use('/feed',feedroute);

app.listen(8080,()=>{
    console.log("server running on http://localhost:8080/")
});

