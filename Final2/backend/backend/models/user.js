const mongoose=require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email:{type :String,required: true ,unique: true},
    password:{ type :String,required: true},
    nomcomplet:{ type :String,required: true},
    codefiscal:{ type :String,required: true},
    adresse:{ type :String,required: true},
    genre:{ type :String,required: true},
    numtele:{ type :String,required: true},
    role:{ type :String,required: true},
    datenaiss:{type : Date,required: true},
   });

   userSchema.plugin(uniqueValidator);
   module.exports = mongoose.model("User",userSchema);  //mongoose.model('name chosed',schema we need);
