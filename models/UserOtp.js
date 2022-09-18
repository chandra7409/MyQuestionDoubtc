const mongoose = require("mongoose");
const UserOtpSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
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
    dateOfBirth: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }

    }


}, { timestamps: true, versionKey: false })
const UserOtp = mongoose.model('UserOtp', UserOtpSchema);

module.exports = UserOtp;