'use strcit'

const mongoose =require('mongoose')
const Schema=mongoose.Schema

const InvernaderoSchema= Schema({
    name      : String,
    description: String,
    product   : String
})

module.exports = mongoose.model('invernadero', InvernaderoSchema)
