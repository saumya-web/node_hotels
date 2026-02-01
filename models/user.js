const mongoose = require('mongoose')
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
    }
})
const Data = mongoose.model("hotel",dataSchema)
module.exports = Data;