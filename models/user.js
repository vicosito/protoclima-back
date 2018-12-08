'use strict'

const mongosse = require ('mongoose');
const Schema = mongosse.Schema;
const bcrypt= require('bcrypt-nodejs');

const UserSchema = new Schema({
    email     :{type: String, unique:true, lowercase:true},
    name      :String,
    password  :{type:String},
    rol_user  :String,
    signupDate:{type:Date,dafault:Date.now()},
    lastLogin :Date
});

UserSchema.pre('save', function (next) {
    let user =  this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10 ,(err, salt) => {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) return next(err);

            user.password=hash;
            next()
        })
    })
});

module.exports=mongosse.model('User',UserSchema);

