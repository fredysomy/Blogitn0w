var mon=require('mongoose');
var express=require('express');
require('dotenv').config()
const helmet = require("helmet");
var path=require('path');
var bodyParser=require('body-parser');
app=express();
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.use(
  helmet.referrerPolicy({
    policy: "no-referrer",
  })
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "example.com"],
      objectSrc: ["'none'"],
      imgSrc:["'self'","'https://ui-avatars.com/api/'"],
      upgradeInsecureRequests: [],
    },
  })
);

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
         
        blogsc.find({}).sort({daten:-1}).then(data=>{
            usersch.find({}).then(data1=>{
                res.render('main',{dash:'<li class="nav-item"><a class="nav-link" href="/user/u">Dashboard</a></li>',users:data1.length,blogdata:data,u:data1});
            })
           })  
             
            
    }
    else{
        blogsc.find({}).sort({daten:-1}).then(data=>{
            usersch.find({}).then(data1=>{
        res.render('main',{dash: '<li class="nav-item"><a class="nav-link" href="/user">Register</a></li><li class="nav-item"><a class="nav-link" href="/user/login">Login</a></li>',
        users:data1.length,blogdata:data}); })
    })  
       
    }
});
app.get('/p/:id',(req,res)=>{
     blogsc.find({uname:req.params.id}).sort({daten:-1}).then(data3=>{
           usersch.findOne({name:req.params.id}).then(data=>{
        res.render('difuser',{
            title:data.realname,
            title2:data.name,
            email:data.email,
            myblog:data3,
            img:data.img,
            descri:data.descr
            });
        })
    })
});
app.use('/user',userroute);
app.use('/feed',feedroute);

app.listen(8080,()=>{
    console.log("server running on http://localhost:8080/")
});

