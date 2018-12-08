'use strict';

const  jwt    = require('jwt-simple');
const  moment = require('moment');
const  config = require('../config');


function createToken(user) {
    const payload={
        sub:user._id,
        name:user.name,
        email:user.email,
        iat: moment().unix(),
        exp: moment().add(14,"days").unix(),
    };

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
    const decoded=new Promise((resolve, reject)=>{
        try{
            const payload=jwt.decode(token, config.SECRET_TOKEN);

            if (payload.exp<=moment().unix()){
                reject({
                    status:401,
                    message:'El token ha expirado'
                })
            }

            resolve(payload.sub)

        }catch (err){
            reject({
                status:500,
                message:'Invalid Token'
            })
        }
    });

    return decoded

}
function FechaHora(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();
    var hh = hoy.getHours();
    var min= hoy.getMinutes();

    dd = addZero(dd);
    mm = addZero(mm);
    min = addZero(min);

    return dd+'/'+mm+'/'+yyyy+' '+hh+':'+min;
}

function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}
module.exports={
    createToken,
    decodeToken,
    FechaHora
};