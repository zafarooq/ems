const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
const {Department} = require('./../db/models/department');

var getEventByid = (id)=>{
    return new Promise((resolve, reject)=>{
        debugger;
        if (!ObjectID.isValid(id)){
            reject({
                'data':'Invalid ID'
            });
        }
        else{
            resolve(
                Department.findById(id).then((d)=>{
                    return d;
                })
            )
        }
    });
}


module.exports= {
    getEventByid

};