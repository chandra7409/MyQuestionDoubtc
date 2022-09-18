const mongoose = require("mongoose");

const UserOtpVerifitcationSchema = mongoose.Schema({

    userId: {
        type: String,
        required: true
    },


    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }
    },
    expiresAt: {
        type: Date,
        default: () => {
            return Date.now()
        }
    },

})
const UserOtpVerifitcation = mongoose.model('UserOtpVerifitcation', UserOtpVerifitcationSchema);

module.exports = UserOtpVerifitcation;