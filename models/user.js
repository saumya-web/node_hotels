const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dataSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
      age:{
        type:Number,
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:Number,
        
    },
    email:{
        type:String,
        required:true
    },
    Salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}) 
dataSchema.pre('save',async function(next){   // pre is a middleware when the save method is called
    const user = this;
    //hash password only if it has been modified or new
    if(!user.isModified('password')) return next();
  try{
    const salt = await bcrypt.genSalt(10);
    
    //hash password
    const hashedPassword = await bcrypt.hash(user.password,salt);

    // overide the plan password to the hashed password
    user.password = hashedPassword;
    
    next();  // provide by mongoose when all the data are set and the transfer the data to the mongoose db.
  }
  catch(err){
     return (err)
  }  
})

dataSchema.methods.comparePassword = async function(candiadatePassword){
    try{
        const isMatch = await bcrypt.compare(candiadatePassword,this.password);
        return isMatch;
    }
    catch(err){
    return err;
    }
    
}
const Data = mongoose.model("hotel",dataSchema)
module.exports = Data;