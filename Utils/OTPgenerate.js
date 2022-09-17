// const otpGenerator = require('otp-generator')
// otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });



// var val = Math.floor(1000 + Math.random() * 9000);
// console.log(val);

var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
console.log(seq);





///other file///
// const router = require('express').Router();
// const authController = require('../controllers/auth.controller');

// router.post('/', authController.signUpUser);
// router.post('/verify', authController.verifyEmail);

// module.exports = router;


// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: false,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   created: {
//     type: String,
//     default: new Date().toISOString(),
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   lastActive: {
//     type: String,
//     required: false,
//   },
//   active: {
//     type: Boolean,
//     default: false,
//   },
//   otp: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model('User', userSchema);////
// const { encrypt, compare } = require('../services/crypto');
// const { generateOTP } = require('../services/OTP');
// const User = require('../models/User');

// module.exports.signUpUser = async(req, res) => {
//     const { email, password } = req.body;
//     const isExisting = await findUserByEmail(email);
//     if (isExisting) {
//         return res.send('Already existing');
//     }
//     // create new user
//     const newUser = await createUser(email, password);
//     if (!newUser[0]) {
//         return res.status(400).send({
//             message: 'Unable to create new user',
//         });
//     }
//     res.send(newUser);
// };
// module.exports.verifyEmail = async(req, res) => {
//     const { email, otp } = req.body;
//     const user = await validateUserSignUp(email, otp);
//     res.send(user);
// };

// const findUserByEmail = async(email) => {
//     const user = await User.findOne({
//         email,
//     });
//     if (!user) {
//         return false;
//     }
//     return user;
// };

// const createUser = async(email, password) => {
//     const hashedPassword = await encrypt(password);
//     const otpGenerated = generateOTP();
//     const newUser = await User.create({
//         email,
//         password: hashedPassword,
//         otp: otpGenerated,
//     });
//     if (!newUser) {
//         return [false, 'Unable to sign you up'];
//     }
//     return [true, newUser];
// };

// const validateUserSignUp = async(email, otp) => {
//     const user = await User.findOne({
//         email,
//     });
//     if (!user) {
//         return [false, 'User not found'];
//     }
//     if (user && user.otp !== otp) {
//         return [false, 'Invalid OTP'];
//     }
//     const updatedUser = await User.findByIdAndUpdate(user._id, {
//         $set: { active: true },
//     });
//     return [true, updatedUser];
// };