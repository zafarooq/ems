const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
    code:{
        type: String,
        unique:true,
        trim: true,
        minlength: 1,
        maxlength:50
    },
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    },
    enabled: {
        type: Boolean,
        default: true
    },
    createdOn:{
        type:Date,
        default: new Date()
    }
});
const Department = mongoose.model('Department', departmentSchema);
module.exports = {
    Department
};
