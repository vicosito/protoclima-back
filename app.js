'use strict';
const express=require('express');
const bodyParser =require('body-parser');
const cors = require('cors');






const app=express();
// cargar rutas
const api=require('./routes')

//var http= require("http");
//var server=http.createServer();

//server.on("api/test", function (req, rep) {
//    rep.writeHead(200,{"Content-Type":"text"});
// rep.write("hola mundo");
//    rep.end();

//})
//server.listen(5000);


//const rest= require('arest')(app);
//rest.addDevice('http','192.168.0.101');

// middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors());

//rutas base
app.use('/api', api)


module.exports=app

