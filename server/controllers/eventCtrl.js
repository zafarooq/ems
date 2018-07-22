const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const {Event} = require('./../db/models/event');
const ctrl = express();
ctrl.use(bodyParser.json());

ctrl.get('/', (req, resp) => {
    Event.find().populate('department_id').then((data) => {
        resp.send(data);
    }, (err) => {
        resp.status(400).send(err);
    });
});

ctrl.get('/:id', (req, resp) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return resp.status(400).send({
            'data': 'invalid Id'
        });
    }
    Event.findById(id).populate('department_id').then((data) => {
        debugger;
        if (!data) {
            return resp.status(400).send({
                'data': 'No Record Found'
            });
        }
        resp.send(data);
    }).catch((e) => {
        resp.status(400).send(e);
    });
});
ctrl.post('/', (req, resp) => {
    var departmentId = req.body.departmentId;
    var event = new Event({
        code: req.body.code,
        title: req.body.title,
        name: req.body.name,
        description: req.body.description,
        enabled: req.body.enabled,
        department_id: departmentId
    });
    event.save().then((doc) => {
        resp.send(doc);
    }, (err) => {
        resp.status(400).send(err);
    });
});

ctrl.put('/:id',(req,resp)=>{
    var id= req.params.id;
    var body = _.pick(req.body,['code','title','name','description','enabled']);
    if (!ObjectID.isValid(id)) {
        return resp.status(400).send({
            'data': 'invalid Id'
        });
    }
    Event.findByIdAndUpdate(id, {$set: body}, {new: true}).then((event) => {
        if(!event){
            return resp.status(400).send({
                'data': 'No Record Found'
            });
        }
        resp.send(event);
    }).catch((e)=>{
        resp.status(400).send(err);
    });
});

ctrl.delete('/:id',(req,resp)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return resp.status(400).send({
            'data': 'invalid Id'
        });
    }
    Event.findByIdAndRemove(id).then((event)=>{
        if(!event){
            return resp.status(400).send({
                'data': 'No Record Found'
            });
        }
        resp.send(event);
    }).catch((err)=>{
        resp.status(400).send(err);
    })

});


module.exports = ctrl;