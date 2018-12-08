'use strict'

const mongoose =require('mongoose')
const Schema=mongoose.Schema
const invernadero=mongoose.model('Invernadero')

const ParamControlSchema= Schema({
        variable : String,
        minletal : Number,
        minbio   : Number,
        optimo   : Number,
        maxbio   : Number,
        maxletal : Number,
        invernaderoid:{type:Schema.ObjectId, ref:'invernadero'}

});

module.exports = mongoose.model('pControl', ParamControlSchema)
