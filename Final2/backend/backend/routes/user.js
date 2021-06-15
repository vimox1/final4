// const mongoose=require('mongoose');
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User=require("../models/user");
const router = express.Router();


router.post("/register",(req,res,next)=>{
    bcrypt.hash(req.body.password,10).then(hash=>{
        const user = new User({
            email: req.body.email,
            password:hash, //req.body.password  // not good because we can read the password we must encrypt it usin bycrypt package
            nomcomplet:req.body.nomcomplet,
            codefiscal:req.body.codefiscal,
            adresse:req.body.adresse,
            genre:req.body.genre,
            numtele:req.body.numtele,
            role:req.body.role,
            datenaiss:req.body.datenaiss,



        });
        user.save()
            .then(result=>{
                res.status(201).json({
                    message: 'user created!',
                    result:result
                });

            })
            .catch(err=>{
                res.status(500).json({
                    error: err
                });
            });

    });
   


});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id },
          "souhaibSAMADI123/.", // secret secande param of jwt used to create your token
          { expiresIn: "1h" } // we can add mor option like exparation time
        );
        res.status(200).json({
          token: token,
          expireIn: 7200
        });
      })
      .catch(err => {
        return res.status(401).json({
          message: "Auth failed"
        });
      });
  });


  router.get=('/settings/profile', (req, res, next) =>{
    User.findOne({ email: req.email },
        (err, user) => {
            if (user)
                
                return res.status(200).json({ status: true, user : _.pick(user,['nomcomplet','email']) });
        }
    );
})
module.exports = router;


// const authSchema = mongoose.Schema({
//  email:{type :String,required: true},
//  password:{ type :String,required: true}
// });
// module.exports = mongoose.model('Auth',authSchema);  //mongoose.model('name chosed',schema we need);