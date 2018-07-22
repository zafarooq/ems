const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
const {Department} = require('./../db/models/department');

var getDepartmentByid = (id)=>{
    return new Promise((resolve, reject)=>{
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
};
var getAllDepartments=()=>{
    return new Promise((resolve,rejct)=>{
        resolve(
            Department.find().then((d)=>{
                return d;

            }).catch((e)=>{
                throw e;

            })
        );
    });
}


module.exports= {
    getDepartmentByid,
    getAllDepartments

};