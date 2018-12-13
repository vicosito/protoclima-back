'use strict'

const mongoose =require('mongoose')
const Schema=mongoose.Schema

const DataSchema= Schema({
    time      : {type: Date, default:Date.now},
    //id        : String,
    name      : String,
    code      : String,
    temperature : String,
    humidity     : String
})

module.exports = mongoose.model('Data', DataSchema)
