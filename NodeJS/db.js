const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/CurdDB',(err)=>{

if(!err)
console.log('MongoDB connection successfull');
else
console.log('error: '+ JSON.stringify(err,undefined,2));

});

module.exports=mongoose;