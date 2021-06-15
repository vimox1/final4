const jwt=require("jsonwebtoken");


module.exports = (req,res,next)=>{
    try{
const token = req.headers.authorization.split(" ")[1];
jwt.verify(token, "souhaibSAMADI123/.");
next();
}catch (error){
    res.statut(401).json({message: "auth failed;"});
}

};


// we add this part as parametre when we want to protect it
