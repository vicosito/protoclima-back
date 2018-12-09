'use strict';

const express = require('express');
const InvernaderoCtrl = require('../controllers/invernadero');
const MicrocontrollerCtrl = require('../controllers/microcontroller');
const SensorCtrl = require('../controllers/sensores');
const DataCtrl = require('../controllers/recordData');
const dashCtrl = require('../controllers/dashboard');
const pcontrolCtrl = require('../controllers/paramControl');
const userCtrl = require ('../controllers/user');
const auth= require('../middlewares/auth');
const api=express.Router();

api.get('/invernadero/', InvernaderoCtrl.getInvernaderos);
api.get('/invernadero/:invernaderoId', InvernaderoCtrl.getInvernadero);
api.post('/invernadero', InvernaderoCtrl.saveInvernadero);
api.put('/invernadero/:id', InvernaderoCtrl.updateInvernadero);
api.delete('/invernadero/:id', InvernaderoCtrl.deleteInvernadero);

api.get('/pcontrols/', pcontrolCtrl.getPControls);
api.get('/pcontrol/:id', pcontrolCtrl.getPControl);
api.post('/pcontrol', pcontrolCtrl.savePControl);
api.put('/pcontrol/:id', pcontrolCtrl.updatePControl);
api.delete('/pcontrol/:id', pcontrolCtrl.deletePControl);


api.post('/signup',userCtrl.signUp);
api.post('/signin',userCtrl.signIn);
api.post('/login',userCtrl.login);

api.post('/micros', MicrocontrollerCtrl.saveMicrocontrolador);
api.get('/micros',MicrocontrollerCtrl.getMicrocontroladores);
api.get('/micro/:id',MicrocontrollerCtrl.getMicrocontrolador);
api.put('/micro/:id',MicrocontrollerCtrl.editMicrocontrolador);
api.delete('/micro/:id',MicrocontrollerCtrl.deleteMicrocontrolador);

api.post('/sensores', SensorCtrl.saveSensor);
api.get('/sensores',SensorCtrl.getSensores);
api.get('/sensores/:id',SensorCtrl.getSensor);
//api.put('/sensores/:id',SensorCtrl.editSensor);
//api.delete('/sensores/:id',SensorCtrl.deleteSensor);


api.post('/data',DataCtrl.saveData);
api.get('/getdata',DataCtrl.getData);
api.post('/getdata2',DataCtrl.getData2);

api.get('/dash',dashCtrl.drawTemperature);

api.put('/update-user/:id',auth,userCtrl.updateUser);

api.post('/test',SensorCtrl.something);

// rutas del arduino




api.get('/private', auth, (req,res) => {
    res.status(200).send({message:'Tienes acceso'})
});


module.exports = api;