const Pic = require('../models/user2')
async function handleBy(req,res){
    const photo = await Pic.find({})
    return res.json(photo)
}
async function handleCreate(req,res){
    
    const {title} = req.body
    const images = req.files?.images
    ?req.files.images.map(file => file.path)
    :[];

    const videos = req.files?.videos
    ?req.files.videos.map(file => file.path)
    :[];

    const result = new Pic({
    title,
    images,
    videos 
    });
    
    const respons = await result.save()

    return res.json(respons);
}
async function handleDelete(req,res){
    const photo = await Pic.findByIdAndDelete(req.params.id)
    if(!photo)res.status(404).json("successfully delete");
    return res.json(photo)
}
module.exports={handleBy,handleCreate,handleDelete}