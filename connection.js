const mongoose = require('mongoose');
const mongoURL="mongodb://127.0.0.1:27017/hotels"
mongoose.connect(mongoURL
//     ,{
//         useNewUrlParser: true,
//       useUnifiedTopology: true 
// }
);
const db = mongoose.connection;
db.on('connected' ,() =>{
    console.log("mongodb is connected");
});
db.on('error' ,(err)=>{
    console.error("there is a error" ,err);
});
db.on('disconnected' ,()=>{
    console.log("mongodb is disconnected");
});
module.exports = db