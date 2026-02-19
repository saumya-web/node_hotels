const Data = require('../models/user');
const{jsonAuthMiddleware, generateToken}= require('../jwt');
async function handleGetAll(req,res){
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
    const User = await Data.findById(req.params.id );
    if (!User)res.status(404).json("all the data are not found")
    return res.json (User); 
}
async function handleUpdateBy(req,res){
    const User = await Data.findByIdAndUpdate(req. params. id ,  req.body,{ new:true , runValidators:true});
    if (!User)res.status(404).json("all the data are not required")
    return res.json (User); 
}
async function handleDeleteBy(req,res){
    const User = await Data.findByIdAndDelete(req.params.id)
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
        const {username, password} = req.body;

        const user = await Data.findOne({ username });

        if(!user){
            return res.status(401).json({error:"Invalid username or password"});
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(401).json({error:"Invalid username or password"});
        }

        const payload = {
            id: user._id,
            username: user.username
        };

        const token = generateToken(payload);

        return res.status(200).json({token});

    }catch(err){
        console.error("LOGIN ERROR:", err);
        return res.status(500).json({error:"internal server error"});
    }
}
async function handleProfile(req , res) {
    try{
        const userData = req.userpayload;
        console.log("userData",userData);
        
    const userId = userData.id
    const user = await Data.findById(userId)

    return res.status(200).json(user)
    }catch(err){
    res.status(500).json({error:"internal server error"})
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
        res.status(500).json({error :" internal server error"})
    }
}
module.exports={handleGetAll,handlegetBy,handleUpdateBy,handleDeleteBy,handleCreate,handleGetByWork,handleLogin,handleProfile }