const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL= process.env.MONGO_URL;
mongoose.connect(mongoURL
//     {
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