'use strict'
const express=require('express');
const bodyParser =require('body-parser');
const mongoose = require('mongoose')

const Invernadero =require('./models/invernadero')


const app=express()
const port=process.env.PORT || 3001

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



app.get('/api/invernadero/', (req, res) => {

    Invernadero.find({},(err, Invernadero) => {
        if(err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
        if(!Invernadero) return res.status(404).send({message:'el producto no existe'})

        res.status(200).send({invernadero: Invernadero})
})
})


app.delete('/api/invernadero/:invernaderoId', (req, res) => {

    let invernaderoId = req.params.invernaderoId

    Invernadero.findById(invernaderoId, (err, Invernadero) => {
        if(err) return res.status(500).send({ message: `Error al borrar el invernadero: ${err}`})

        invernadero.remove(err =>{
    if(err) return res.status(500).send({ message: `Error al borrar el invernadero: ${err}`})
    res.status(200).send({message:'El invernadero ha sido eliminado'})
})
})
})

app.get('/api/invernadero/:invernaderoId', (req, res) => {

    let invernaderoId = req.params.invernaderoId

    Invernadero.findById(invernaderoId, (err, Invernadero) => {
    if(err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
    if(!Invernadero) return res.status(404).send({message:'el producto no existe'})

res.status(200).send({invernadero: Invernadero})
})
})


app.post('/api/invernadero', (req, res) => {
    console.log('POST /api/invernadero')
    console.log(req.body)
    let post_invernadero = new Invernadero()

    post_invernadero.name        = req.body.name
    post_invernadero.description = req.body.description
    post_invernadero.product     = req.body.product

    post_invernadero.save((err, invernaderoStored) => {
        if (err) res.status(500).send({message:'Error al salvar en la BD'})

        res.status(200).send({Invernadero: invernaderoStored})
    })


})


mongoose.connect('mongodb://localhost:27017/shop', (err, res) =>
{
    if (err) {
        return console.log(`error al conectar a la base de datos: ${err}`)
    }
console.log('la conexion a la base de datos esta establecida..')
    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`)
    })

})


