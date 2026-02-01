const Menu = require('../models/user1');
async function handleGetById(req,res){
    const menu = await Menu.find({})
    return res.json(menu)
}
async function handlegetById(req,res){
    const menu = await Menu.findById(req.params.id)
    if(!menu)res.status(404).json("data not found")
    return res.json(menu);    
}
async function handleUpdateById(req,res){
    const menu = await Menu.findByIdAndUpdate(req.params.id ,req.body ,{new:"true",runValidate:"true"})
    if(!menu)res.status(404).json("data not found")
    return res.json(menu);    
}
async function handleDeleteById(req,res){
    const menu = await Menu.findByIdAndDelete(req.params.id)
    if(!menu)res.status(404).json("data not found")
    return res.json(menu);    
}
async function handleCreateById(req,res){
    try{
        const idea = req.body
        const newqusion  = new Menu(idea)
        const respon = await newqusion.save();
        return res.json(respon)
    }
    catch(err){
          console.log(err);
        res.status(500).json("server error")
    }  
 }
module.exports = {
    handleGetById,
    handlegetById,
    handleUpdateById,
    handleDeleteById,
    handleCreateById
}