 const mongoose = require('mongoose');
 const express = require('express');
 const bodyParser = require('body-parser');
 const _ = require('lodash');
 const { ObjectID } = require('mongodb');
 const { Department } = require('./../db/models/department');
 const departmentManger = require('./../managers/departmentManager');


 const ctrl = express();
 ctrl.use(bodyParser.json());

 ctrl.get('/', (req, resp) => {
     Department.find().then((data) => {
         resp.send(data);
     }, (err) => {
         resp.status(400).send(err);
     });
 });


 ctrl.get('/:id', (req, resp) => {
    var id = req.params.id;
    debugger;
     departmentManger.getEventByid(id).then((d)=>{
         resp.send(d);
     }).catch((e)=>{
        resp.status(400).send(e);
     })
    //  var id = req.params.id;
    //  if (!ObjectID.isValid(id)) {
    //      return resp.status(400).send({
    //          'data': 'invalid Id'
    //      });
    //  }
    //  Department.findById(id).then((data) => {
    //      if (!data) {
    //          return resp.status(400).send({
    //              'data': 'No Record Found'
    //          });
    //      }
    //      resp.send(data);
    //  }).catch((e) => {
    //      resp.status(400).send(e);
    //  });

 });


 ctrl.post('/', (req, resp) => {
     var department = new Department({
         code: req.body.code,
         name: req.body.name,
         description: req.body.description,
         enabled: req.body.enabled
     });
     department.save().then((data) => {
         resp.send(data);
     }, (err) => {
         resp.status(400).send(err);
     });
 });

 ctrl.put('/:id', (req, resp) => {
     var id = req.params.id;
     var body = _.pick(req.body, ['code', 'title', 'name', 'description', 'enabled']);
     if (!ObjectID.isValid(id)) {
         return resp.status(400).send({
             'data': 'invalid Id'
         });
     }
     Department.findByIdAndUpdate(id, {
         $set: body
     }, {
         new: true
     }).then((data) => {
         if (!data) {
             return resp.status(400).send({
                 'data': 'No Record Found'
             });
         }
         resp.send(data);
     }).catch((e) => {
         resp.status(400).send(err);
     });
 });

 ctrl.delete('/:id', (req, resp) => {
     var id = req.params.id;
     if (!ObjectID.isValid(id)) {
         return resp.status(400).send({
             'data': 'invalid Id'
         });
     }
     Department.findByIdAndRemove(id).then((data) => {
         if (!data) {
             return resp.status(400).send({
                 'data': 'No Record Found'
             });
         }
         resp.send(data);
     }).catch((err) => {
         resp.status(400).send(err);
     })

 });


 module.exports = ctrl;