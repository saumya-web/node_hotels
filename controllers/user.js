const Data = require('../models/user');
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
    const User = await Data.findByAndUpdate(req. params. id ,  req.body,{ new:true , runValidate:true});
    if (!User)res.status(404).json("all the data are not required")
    return res.json (User); 
}
async function handleDeleteBy(req,res){
    const User = await Data.findByAndDelete(req.params.id)
    if (!User)res.status(404).json("all the data are  not required")
    return  res.json (User); 
}
async function handleCreate(req,res){
    try{
        const text = req.body
        const user = new Data(text);
        const response = await user.save();
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json("server error")
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
module.exports={handleGetBy,handlegetBy,handleUpdateBy,handleDeleteBy,handleCreate,handleGetByWork }