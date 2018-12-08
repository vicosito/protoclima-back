'use strict'

const mongoose =require('mongoose')
const Schema=mongoose.Schema
const invernadero=mongoose.model('Invernadero')

const MicrocontrollerSchema= Schema({
    code         : String,
    modelo       : String,
    description  : String,
    ip           : String,
    invernaderoid:{type:Schema.ObjectId, ref:'invernadero'}
})

module.exports = mongoose.model('Microcontroller', MicrocontrollerSchema)
