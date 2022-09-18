/**
 * This file will contains the logic for routing request
 * 
 * This file is dedicated to the routing logic for sign up and sign in
 */
const authController = require("../controllers/auth.controllers")
    //console.log(require("../middlewares"));
    //const { verifySignUp } = require("../middlewares");
module.exports = (app) => {
    /**
     * POST   /Swimn/api/v1/auth/signup
     */
    app.post("/Swimn/api/v1/auth/signup", authController.signup);

    /**
     * LOGIN
     * 
     * POST /Swimn/api/v1/auth/login
     */
    app.post("/Swimn/api/v1/auth/signin", authController.signin);
    app.post("/Swimn/api/v1/auth/signin", authController.verifyOTP);
    app.post("/Swimn/api/v1/auth/signin", authController.resendOTPVerificationCode);
    app.post("/Swimn/api/v1/auth/signin", authController.sendOTPverificationEmail);

}