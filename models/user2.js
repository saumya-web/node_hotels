const mongoose = require('mongoose')
const picSchema = new mongoose.Schema({
    title:{
      type:String,
    },
    images:[{
        type:String,
    }],
    videos:[{
        type:String
    }]
})
const Pic = mongoose.model("pic",picSchema);
module.exports = Pic;