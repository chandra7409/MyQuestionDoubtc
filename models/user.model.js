const mongoose = require("mongoose");
const constant = require("../Utils/constant");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    Task: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 10,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userStatus: {
        type: String,
        required: true,
        default: constant.userTypes.customer,
        enum: [constant.userTypes.COMPLETE,
            constant.userTypes.INCOMPLETE

        ],
    },
    userType: {
        type: String,
        required: true,
        default: constant.userTypes.customer,
        enum: [constant.userTypes.customer, constant.userTypes.admin]
    },

}, { timestamps: true, versionKey: false })
const User = mongoose.model('User', userSchema);

module.exports = User;