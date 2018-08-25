
'use strict'

const Invernadero =require('../models/invernadero')

function getInvernadero(req, res){
    let invernaderoId = req.params.invernaderoId

    Invernadero.findById(invernaderoId, (err, Invernadero) => {
        if(err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
        if(!Invernadero) return res.status(404).send({message:'el producto no existe'})

        res.status(200).send({invernadero: Invernadero})
    })
}


function getInvernaderos(req, res){

    Invernadero.find({},(err, Invernadero) => {
        if(err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
        if(!Invernadero) return res.status(404).send({message:'el producto no existe'})

        res.status(200).send({invernadero: Invernadero})
    })
}

function saveInvernadero(req, res){

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

}

function updateInvernadero(req, res){
    let put_invernaderoid = req.params.invernaderoid
    let update = req.body
    Invernadero.findByIdAndUpdate(put_invernaderoid, update, (err, invernaderoUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar el invernadero: ${err}`})

        res.status(200).send({invernadero: put_invernaderoid})
    })

}

function deleteInvernadero(req, res){
    let del_invernaderoId = req.params.invernaderoId

    Invernadero.findById(del_invernaderoId, (err, Invernadero) => {
        if(err) res.status(500).send({ message: `Error al borrar el invernadero: ${err}`})

        Invernadero.remove(err => {
            if(err)  res.status(500).send({ message: `Error al borrar el invernadero: ${err}`})
            res.status(200).send({message:'El invernadero ha sido eliminado'})
        })
    })

}

module.exports={
    getInvernadero,
    getInvernaderos,
    saveInvernadero,
    updateInvernadero,
    deleteInvernadero

}

