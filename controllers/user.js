'use strict'


 const User    = require('../models/user');
 const service = require('../services');
const bcrypt= require('bcrypt-nodejs');

function signUp(req, res)  {
    const user = new  User({
        email:     req.body.email,
        name :     req.body.name,
        password:  req.body.password,
        rol_user:  req.body.rol_user
    });

    User.findOne({email: user.email.toLowerCase()},(err,issetUser)=>{
        if(err){
            res.status(500).send({message:'Error al comprobar usuario'});
        }else {
            if(!issetUser){
                user.save((err, userStored)=> {

                    if (err) {
                        res.status(500).send({message: `Error al crear el usuario: ${err}`});
                    }else{
                        if(!userStored){
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        }else{
                            //res.status(201).send({token: service.createToken(user)})
                            res.status(201).send({user:userStored})
                        }
                    }

                })
            }else{
                res.status(200).send({message:'El usuario ya existe, no puede registrarse'})
            }
        }
    })


}

function signIn() {
    User.find({email: req.body.email},(err, user) => {
        if(err) return res.status(500).send({message:err});

        if(!user) return res.status(404).send({message:'No existe el usuario'});

        req.user=user;
        res.status(200).send({
            message:'Te has logueado correctamente',
            token  : service.createToken(user)
        })
    })

}
function login(req,res){
    var params=req.body;
    var email=params.email;
    var password=params.password;


    User.findOne({email:email.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message:'Error al comprobar el usuario'});
        }else{

            if(user){
                 bcrypt.compare(password, user.password, (err, check) => {
                    if(check){
                        if(params.gettoken=='true'){
                             //devolver token jwt
                           res.status(200).send({token:service.createToken(user)});

                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message:'el usuario no ha podido loguearse correctamente'});
                    }
                });
            }else{
                res.status(404).send({message:'El usuario no ha podido loguearse'});
            }
        }
    });
}
function updateUser(req, res){
    var userId=req.params.id;
    var update=req.body;
     console.log(req.user.sub());
/*
    if(userId!=req.user.sub()){
        return res.status(500).send({message:'No tienes permisos para actualizar'})
    }*/
    User.findByIdAndUpdate(userId, update, {new:true},(err, userUpdated) => {
        if(err){
            res.status(500).send({message:'Error al actualizar usuario'});
        }else{
            if(!userUpdated){
                console.log(userUpdated);
                res.status(404).send({message:'No se pudo actualizar el usuario'});

            }else{ res.status(200).send({user:userUpdated});}
        }
    })
}

module.exports={
    signUp,
    signIn,
    login,
    updateUser
}