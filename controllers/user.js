const Data = require('../models/user');
const{jsonAuthMiddleware, generateToken}= require('../jwt');
async function handleGetBy(req,res){
    try{
    const User = await Data.find({})
    return res.json(User);
    }
    catch(err){
        console.log(err);
        res.status(500).json("server error") 
    }
} ;
async function handlegetBy(req,res){
    const User = await Data.findBy(req.params.id );
    if (!User)res.status(404).json("all the data are not found")
    return res.json (User); 
}
async function handleUpdateBy(req,res){
    const User = await Data.findByAndUpdate(req. params. id ,  req.body,{ new:true , runValidators:true});
    if (!User)res.status(404).json("all the data are not required")
    return res.json (User); 
}
async function handleDeleteBy(req,res){
    const User = await Data.findByAndDelete(req.params.id)
    if (!User)res.status(404).json("all the data are  not required")
    return  res.json (User); 
}

//for signup 
async function handleCreate(req,res){
    try{
        const text = req.body //assuming the request body contain the Data body

        const user = new Data(text);//create the new Data document using the mongoose model

        const response = await user.save();// save the new data to the database

        const payload ={
           id : response.id,
          username :response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("token is:" ,token);
        
        res.status(200).json({response:response,token:token});
    }
    catch(err){
        console.log(err);
        res.status(500).json("server error")
    }
}   
//for login
async function handleLogin(req,res){
    try{
        //extract the username , password
        const {username, password} = req.body;
        const user = await Data.findOne({username:username})
        if(!user || !await comparePassword(password , user.password)){
            return res.status(404).json("invalid password");
        }
        //generate Token
        const payload = {
           id : user.id,
           username :user.username
        }
        const token = generateToken(payload);
        res.json({token})
    }catch(err){
        return res.status(404).json("internal server error")
    }
} 


// to get a specific or 1 argument type data
async function handleGetByWork(req,res){
    try{
        const workType = req.params.workType
        if(workType =='chef'||workType =='waiter'||workType == 'manager'){
            const resp = await Data.findOne({work:workType});
             return res.status(200).json(resp);
        }else{
            res.status(400).json("invalid type")
        }
    }
    catch(err){
        res.status(500).json("server error")
    }
}
module.exports={handleGetBy,handlegetBy,handleUpdateBy,handleDeleteBy,handleCreate,handleGetByWork,handleLogin }