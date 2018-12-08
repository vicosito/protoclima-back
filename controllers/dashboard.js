'use strict'

function drawTemperature (req,res) {
    res.status(200).send({data:Math.floor(Math.random() * (50 - 1) + 1),error: false});

    //res.send({ data: Math.floor(Math.random() * (1000 - 1) + 1), code: 200, error: false });
}

module.exports={
    drawTemperature
}
