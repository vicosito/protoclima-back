
'use strict'

const pControl =require('../models/paramControl');

function getPControl(req, res){
    let pcontrolId = req.params.id;

    pControl.find({"invernaderoid":pcontrolId}, (err, pcontrol) => {
        if(err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`});
        if(!pControl) return res.status(404).send({message:'los paramtros no existe no existen'});

        res.status(200).send({pcontrol: pcontrol})
    })
}


function getPControls(req, res){

    pControl.find({},(err, pcontrol) => {
        if(err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`});
        if(!pControl) return res.status(404).send({message:'los parametros no existen'});

        res.status(200).send({pcontrols: pcontrol})
    })
}

function savePControl(req, res){

    const paramControl  =new pControl({
        variable     : req.body.variable,
        minletal     : req.body.minletal,
        minbio       : req.body.minbio,
        optimo       : req.body.optimo,
        maxbio       : req.body.maxbio,
        maxletal     : req.body.maxletal,
        invernaderoid:req.body.invernaderoid
    });

//    console.log('POST /api/invernadero')
    console.log(req.body)

    paramControl.save((err, pcontrol) => {

        if (err) res.status(500).send({message:`Error al crear los parametros: ${err}`});

        res.status(200).send({pcontrol: pcontrol})
    })

}


function updatePControl(req, res){
    let put_pcontrolid = req.params.id
    let update = req.body
    pControl.findByIdAndUpdate(put_pcontrolid, update, (err, pcontrol) => {
        if (err) res.status(500).send({message: `Error al actualizar el invernadero: ${err}`})

        res.status(200).send({pcontrol: pcontrol})
    })

}

function deletePControl(req, res){
    let del_pcontrolId = req.params.id
    PControl.findById(del_pcontrolId, (err, pcontrol) => {
        if(err) res.status(500).send({ message: `Error al borrar el registro: ${err}`})

        pcontrol.remove(err => {
            if(err)  res.status(500).send({ message: `Error al borrar el registro: ${err}`})
            res.status(200).send({message:'El registro ha sido eliminado'})
        })
    })

}

module.exports={
    getPControls,
    getPControl,
    savePControl,
    updatePControl,
    deletePControl

}

