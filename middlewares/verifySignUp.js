    /**
     * This file will have the logic to validate the incoming request body
     */
    const User = require("../models/user.model");
    const constant = require("../Utils/constant");
    const validateSignUpRequestBody = async(req, res, next) => {
        if (!req.body.name) {
            return res.status(400).send({ message: "Failed ! User name is not provided" })

        }
        if (!req.body.userId) {
            return res.status(400).send({ message: "Failed ! User userId is not provided" })

        }
        try {

            const user = await User.findOne({ userId: req.body.userId });
            if (user != null) {
                return res.status(400).send({
                    message: "Failed ! UserId is already taken"
                })
            }
        } catch (err) {

            return res.status(500).send({
                message: "Internal server error while validating the request"
            })
        }

        if (!req.body.password) {
            return res.status(400).send({
                message: "Failed ! Password is not provided"
            })
        }

        //Validate if the email is present, is valid and not duplicate
        if (!req.body.email) {
            return res.status(400).send({
                message: "Failed ! Email is not provided"
            })
        }

        if (!isValidEmail(req.body.email)) {
            return res.status(400).send({
                message: "Failed ! Not a valid email id"
            })
        }
        // Validate if the userType is present and valid
        if (!req.body.userType) {
            return res.status(400).send({
                message: "Failed ! User type is not passed"
            });
        }

        if (req.body.userType == constant.userTypes.customer) {
            return res.status(400).send({
                message: "User registartion is not allowed"
            })
        }





        next(); // Give conrol to the next middleware or controller
    }


    const isValidEmail = (email) => {
        return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }



    const validateSignInRequestBody = (req, res, next) => {

        // Validate if the userId is present 
        if (!req.body.userId) {
            return res.status(400).send({
                message: "Failed ! UserId is not provided"
            })
        }

        if (!req.body.password) {
            return res.status(400).send({
                message: "Failed ! Password is not provided"
            })
        }

        next();
    }


    const verifyRequestBodiesForAuth = {
        validateSignUpRequestBody: validateSignUpRequestBody,
        validateSignInRequestBody: validateSignInRequestBody
    };

    module.exports = verifyRequestBodiesForAuth;