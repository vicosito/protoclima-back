'use strict'

const mongoose =require('mongoose')
const Schema=mongoose.Schema

const InvernaderoSchema= Schema({
    code       :{ type : String , unique : true, required : true },
    name       : String,
    product    : String,
    description: String,
    state      : Boolean
})

module.exports = mongoose.model('Invernadero', InvernaderoSchema)
