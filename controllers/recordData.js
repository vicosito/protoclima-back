
'use strict'

const Data =require('../models/data');
const fecha= require('../services');



function saveData(req, res) {
//    var fechah =new Date(fecha.FechaHora());

    const data = new Data({

  //      time: fechah,
        id: req.body.id,
        name: req.body.name,
        code: req.body.code,
        temperature:req.body.temperature,
        humidity:req.body.humidity
    });
    data.save((err, dataSave) => {

        if (err) res.status(500).send({message: `Error al crear el registro: ${err}`});

        res.status(200).send({datasave: dataSave})
    })
}
function getData(req, res) {
let fec= "2018-10-26";
    Data.find({time:{$gte:new Date(fec,)}}, (err, datos) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if (!datos) return res.status(404).send({message: 'el sensor no existe'});

        res.status(200).send({datos: datos})
    })
}
function getData2(req, res) {
    let fechaini = new Date(req.body.fechaini);
    let fechafin = new Date(req.body.fechafin);
    let fec= "2a018-10-26";
    Data.find({time:{$gte:fechaini,$lte:fechafin}}, (err, datos) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if (!datos) return res.status(404).send({message: 'el sensor no existe'});

        res.status(200).send({datos: datos})
    })
}

module.exports={
        saveData,
        getData,
    getData2
    }