'use strict'

const Sensor = require('../models/sensor');

function getSensores(req, res) {

    Sensor.find({}, (err, Sensor) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if (!Sensor) return res.status(404).send({message: 'el sensor no existe'});

        res.status(200).send({sensores: Sensor})
    })
}
function getSensor(req, res){
    let sensorid = req.params.id;

    Sensor.find({"micontrolador":sensorid}, (err, rsensor) => {
        if(err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`});
        if(!rsensor) return res.status(404).send({message:'los paramtros no existe no existen'});

        res.status(200).send({sensor: rsensor})
    })
}

function saveSensor(req, res) {

    const sensor = new Sensor({
        tipo          : req.body.tipo,
        description   : req.body.description,
        pinmicro      : req.body.pinmicro,
        micontrolador : req.body.micontrolador
    });

//    console.log('POST /api/microcontrolador')
    console.log(req.body)

    sensor.save((err, sensorStored) => {

        if (err) res.status(500).send({message: `Error al crear el microcontrolador: ${err}`});

        res.status(200).send({sensor: sensorStored})
    });
}

function something(req, res) {

    Sensor.find({}, (err, Sensor) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if (!Sensor) return res.status(404).send({message: 'el sensor no existe'});

        res.status(200).send({sensores: Sensor})
    })
}
module.exports = {
    saveSensor,
    getSensores,
    getSensor,
    something
}

