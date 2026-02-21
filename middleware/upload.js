const multer = require('multer')
const path = require('path');
const fs =require('fs')

const uploadPath =  path.join(__dirname,'../uploads');
if(!fs.existsSync(uploadPath)){
   fs.mkdirSync(uploadPath)
}   
const storage = multer.diskStorage({
    destination :(req,file,cb) =>{
     cb(null,uploadPath)
    },
    filename:(req ,file,cb) =>{
        const uniquename =Date.now() +".."+path . extname(file = file.originalname)
        cb(null,uniquename)
    }
});
const fileFilter = (req,file,cb) =>{
    const ext = path.extname(file.originalname)
    if(['.jpeg','.png','.jpg','.imp4'].includes(ext)){
        cb(null,true)
    }
    else{
        cb(new Error("only video and image allow"));
    }
};
const upload =multer({
    storage, fileFilter});
module.exports = upload;