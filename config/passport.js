const express = require("express")
const mongoose = require("mongoose")
const LocalStrategy = require("passport-local").Strategy
const userSchema = require("../model/userSchema")
const passport = require("passport")



module.exports =  passportAuth = ( passport, res) =>{

   

    
passport.serializeUser(function(user, done) {
done(null, user.id);
});

passport.deserializeUser(function(id, done) {
userSchema.findById(id, (err, user) =>{
done(err, user);

})

});

}