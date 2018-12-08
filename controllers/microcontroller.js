'use strict'

const Microcontrolador = require('../models/microntroller');
const Invernadero = require('../models/invernadero');

function getMicrocontrolador(req, res){
let microId= req.params.id;
    Microcontrolador.findById(microId, (err, micro) => {
        if(err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`});
        if(!micro) return res.status(404).send({message:'el microcontrolador no existe'});

        res.status(200).send({microcontrolador: micro})
    })
}

function getMicrocontroladores(req, res){  // con invernaderos
    Microcontrolador.find({}, (err, micro)=>{
        Invernadero.populate(micro, {path: "invernaderoid"}, (err, micro)=>{
           if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
           if (!micro) return res.status(404).send({message: 'el producto no existe'});

            res.status(200).send({microcontroladores: micro})
        })
    })
}
function editMicrocontrolador(req, res){
    let put_microid = req.params.id
    let update = req.body
    Microcontrolador.findByIdAndUpdate(put_microid, update, (err, microUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar el micro: ${err}`})

        res.status(200).send({micro: microUpdated})
    })

}
function deleteMicrocontrolador(req, res){
    let del_microId = req.params.id

    Microcontrolador.findById(del_microId, (err, Micro) => {
        if(err) res.status(500).send({ message: `Error al borrar el invernadero: ${err}`})

        Micro.remove(err => {
            if(err)  res.status(500).send({ message: `Error al borrar el invernadero: ${err}`})
            res.status(200).send({message:'El invernadero ha sido eliminado'})
        })
    })

}
function saveMicrocontrolador(req, res){

    const micro =new Microcontrolador({
        code               : req.body.code,
        modelo             : req.body.modelo,
        description        : req.body.description,
        ip                 : req.body.ip,
        invernaderoid      : req.body.invernaderoid
    });

//    console.log('POST /api/microcontrolador')
    console.log(req.body)

    micro.save((err, microStored) => {

        if (err) res.status(500).send({message:`Error al crear el microcontrolador: ${err}`});

        res.status(200).send({microcon: microStored})
    })

}
module.exports={
    saveMicrocontrolador,
    getMicrocontroladores,
    getMicrocontrolador,
    editMicrocontrolador,
    deleteMicrocontrolador
}
