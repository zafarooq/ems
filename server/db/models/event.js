const mongoose = require('mongoose');
const Department = require('./department');
const eventSchema = mongoose.Schema({
    code:{
        type: String,
        unique:true,
        trim: true,
        minlength: 1,
        maxlength:50
    },
    title:{
        type: String,
        trim: true,
        unique: true,
        minlength: 1,
        maxlength:50
    },
    name:{
        type: String,
        trim: true,
        maxlength:50,
        minlength: 1
    },
    description:{
        type: String,
        trim: true,
        maxlength: 500
    },
    enabled:{
        type: Boolean,
        default: true
    },
    createdOn:{
        type:Date,
        default: new Date()
    },
    department_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Department'
    }
});
const Event =mongoose.model ('Event', eventSchema);
module.exports = { Event };