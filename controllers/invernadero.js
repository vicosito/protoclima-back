
'use strict'

const Invernadero =require('../models/invernadero');

function getInvernadero(req, res){
    let invernaderoId = req.params.invernaderoId;

    Invernadero.findById(invernaderoId, (err, Invernadero) => {
        if(err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`});
        if(!Invernadero) return res.status(404).send({message:'el producto no existe'});

        res.status(200).send({invernadero: Invernadero})
    })
}


function getInvernaderos(req, res){

    Invernadero.find({},(err, Invernadero) => {
        if(err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`});
        if(!Invernadero) return res.status(404).send({message:'el producto no existe'});

        res.status(200).send({invernadero: Invernadero})
    })
}

function saveInvernadero(req, res){

const invernadero =new Invernadero({
    code       : req.body.code,
    name       : req.body.name,
    description: req.body.description,
    product    : req.body.product,
    state      : req.body.state
});

//    console.log('POST /api/invernadero')
   console.log(req.body)

    invernadero.save((err, invernaderoStored) => {

        if (err) res.status(500).send({message:`Error al crear el invernadero: ${err}`});

        res.status(200).send({invernadero: invernaderoStored})
    })

}


function updateInvernadero(req, res){
    let put_invernaderoid = req.params.id
    let update = req.body
    Invernadero.findByIdAndUpdate(put_invernaderoid, update, (err, inverupdate) => {
        if (err) res.status(500).send({message: `Error al actualizar el invernadero: ${err}`})

        res.status(200).send({invernadero: inverupdate})
    })

}

function deleteInvernadero(req, res){
    let del_invernaderoId = req.params.id
console.log(del_invernaderoId);
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

