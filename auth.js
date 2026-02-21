const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Data = require('./models/user');

passport.use(new LocalStrategy(async (username, password, done)=>{  //function in which the username,password and done is the callback function provided by passport
    try{
        const user = await Data.findOne({username});
        if(!user)
            return done(null,false,{message:'Incorrect username'});
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch)
            return done(null,user);
        else
            return done(null,false,{message:'incorect password'})
    }catch{
        
        return done(error);
    }
}));
module.exports = passport