'use strict'

const mongoose =require('mongoose')
const Schema=mongoose.Schema
const micontrolador=mongoose.model('Microcontroller')
const SensorSchema= Schema({
    tipo          : String,
    description   : String,
    pinmicro      : String,
    micontrolador : {type:Schema.ObjectId, ref:'micontrolador'}
});

module.exports = mongoose.model('Sensor', SensorSchema)
