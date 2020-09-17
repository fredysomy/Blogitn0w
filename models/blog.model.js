var mon=require('mongoose');

var sc2= mon.Schema;

var blogschema=new sc2({
    mailuser: { type: String, required: true },
    name:{type:String,required:true},
    uname:{type:String,required:true},
    head: { type: String, required: true },
    blog: { type: String, required: true },
    daten:{type: Date},
    img:{type:String}
});

var blogsc=mon.model('blogsc',blogschema);

module.exports=blogsc;
