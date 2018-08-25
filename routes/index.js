'use strict'

const express = require('express')
const InvernaderoCtrl = require('../controllers/invernadero')
const api=express.Router()

api.get('/invernadero/', InvernaderoCtrl.getInvernaderos)
api.get('/invernadero/:invernaderoId', InvernaderoCtrl.getInvernadero)
api.post('/invernadero', InvernaderoCtrl.saveInvernadero)
api.put('/invernadero/:invernaderoid', InvernaderoCtrl.updateInvernadero)
api.delete('/invernadero/:invernaderoId', InvernaderoCtrl.deleteInvernadero)


module.exports = api;