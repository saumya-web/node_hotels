const express = require('express');
const app = express(); 
const db = require('./connection')
require('dotenv').config();
const PORT = process.env.PORT || 3120
const passport = require('./auth')
const dataRouter = require('./routers/user')
const menuRouter = require('./routers/user1')



 //middleware
const logRequest = (req , res, next) =>{
    console.log(`[${new Date().toLocaleString()} ]Request Made to: ${req.originalUrl}`);
    next();
}

//authorization
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(logRequest);
app.use('/hotel',localAuthMiddleware,dataRouter);
app.use('/qusien',menuRouter);
app.listen(PORT,()=>{console.log(`server is connected ${PORT}`)
});
