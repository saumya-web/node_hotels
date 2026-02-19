const jwt = require('jsonwebtoken');

const jsonAuthMiddleware =(req,res,next)=>{
    const authHeader = req.headers.authorization;
    //extact the jwt token from the request header
    if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({error:"Unauthorized"});
    }
    try{
        //verify token
       const decoded = jwt.verify(token,process.env.JWT_SECRET);
       req.userpayload = decoded
        next();
    }catch(err){
     console.log(err);
     res.status(404).json({error : "invalid user"});
 }
}
//function to generate token
const generateToken= (userData) =>{
    //generate a new jwt token using payload

    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn: "10h"});
}
module.exports= {jsonAuthMiddleware, generateToken};