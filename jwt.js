const jwt = require('jsonwebtoken');

const jsonAuthMiddleware =(req,res,next)=>{
 
    //extact the jwt token from the request header
    const token = req.header.authorization.split(' ')(1);
    if(!token){
        return res.status(404).json({error:"Unauthorized"});
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

    return jwt.sign(userData,process.env.JWT_SECRET,{experyIn:30});
}
module.exports= {jsonAuthMiddleware, generateToken};