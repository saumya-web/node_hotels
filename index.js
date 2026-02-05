const express = require('express');
const app = express(); 
const db = require('./connection')
require('dotenv').config();
const Port = process.env.PORT
const dataRouter = require('./routers/user')
const menuRouter = require('./routers/user1')


const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/hotel',dataRouter);
app.use('/qusien',menuRouter);
app.listen(PORT,()=>{console.log(`mongodb is connected${PORT}`)
});
