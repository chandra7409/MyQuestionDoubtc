// User must be able to login / logout using email ID and Password. OTP should be sent to email ID. User Session and Authentication should be taken care of. Please create an API endpoint for the same.
//  Create a POST API,  where logged in users can post any Task. The following are the required fields : Date, Task : String,  Status : Completed / Incomplete. The task is basically a string which contains the task. Eg : Swimming for one hour
// Create a Patch API where a logged in user must have the provision to edit the Task. He should have the provision to edit one or more parameters of the Task Object. Eg : Date, Task or Status
//  Create a delete API where the user must have provision to delete a particular task.

// Note : All These APIs must be accessible only by logged in Users. Give necessary error messages. For testing, set an automatic session time out of 30 seconds. Session Invalid Error Notifications should also be displayed.

// sir pls check the authController and related to models  sir pls According to Question 

const User = require('../models/user.model');
const USEROTP = require('../models/UserOtp.js');



const bcrypt = require("bcrypt");
const UserOtpVerifitcation = require('../models/UserOtpVerifitcation.model');

require("dotenv").config();
// path for static verified
const path = require("path");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        auth: {

            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS,

        },
    })
    //testing  success
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("ready for a message");
        console.log(success);
    }
});


// setting server url

const development = "http://localhost:3400/";
const production = "http:radiant-meadow-44726.heroku.com";
const currentUrl = process.env.NODE_ENV ? production : development;



// signup for this route
// router.post("/signup", async(req, res) => {
//     try {
//         const { name, email, password, dateOfBirth } = req.body;
//         name = name.trim();
//         email = email.trim();
//         password = password.trim();
//         dateOfBirth = dateOfBirth.trim();
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({
//             message: "some internal error"
//         })
//     }
// })

////////////////////////////////////////////////////////////////////////////////////////
/**
 * Controller for signup/registration
 */

exports.signup = async(req, res) => {

    try {
        //How the user sign up will happen
        const userObjToBeStoredInDB = {
                name: req.body.name,
                userId: req.body.userId,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                dateOfBirth: req.body.Date.now(),

            }
            /**
             * Insert this new user to the db
             */

        const user = await User.create(userObjToBeStoredInDB);

        // return created user
        res.status(201).send(userResponse([user]));
    } catch (err) {
        console.error("Error while creating new user", err.message);
        res.status(500).send({
            message: "some internal error while inserting new user"
        })
    }

}

/**
 * Controller for signin
 */

exports.signin = async(req, res) => {

    //Search the user if it exists 
    try {
        var user = await User.findOne({ userId: req.body.userId });
    } catch (err) {
        console.log(err.message);
    }
    if (user == null) {
        return res.status(400).send({
            message: "Failed ! User id doesn't exist"
        })
    }

    //User is existing, so now we will do the password matching
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send({
            message: "Invalid Password"
        })
    }

    //** Successfull login */
    //I need to generate access token now
    const token = jwt.sign({ _id: user.userId }, config.secret, {
        expiresIn: 360000
    });

    //Send the response back
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        dateOfBirth: user.dateOfBirth,
        accessToken: token
    })

};

/////////////////////////////////////////////////////////////

////send otp verification email
exports.sendOTPverificationEmail = async({ _id, email }, res) => {

    try {
        const otp = `${Math.floor(1000 + Math.random()*9000)}`;

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "verify your mail",
            html: `<p>Enter ${otp}in the verify your mail address and connect  <p> this code <b> expire in 30 second</b></p></p>`
        };

        /// send the Otp
        const saltRound = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRound);
        const newOTPVerification = await new UserOtpVerifitcation({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 1800,

        });

        ///save otp record
        await newOTPVerification.save();
        await transporter.sendMail(mailOptions);
        res.json({
            status: "incomplete",
            message: "verification otp mail sent",
            date: {
                userId: _id,
                email,
            },
        });

    } catch (err) {
        res.json({
            status: "Failed",
            message: "some error timing the verification mail"
        })
        console.log("some error during the ", err.message);
    }
}



///verify the otp mail

exports.verifyOTP = async(req, res) => {
    try {
        const { userId, otp } = req.body;
        if (!userId || !otp) {
            return res.status(401).json({ message: "empty otp detail are not allow" })
        } else {
            const UserOtpVerificationRecord = await UserOtpVerifitcation.find({
                userId,
            });
            if (UserOtpVerificationRecord.length <= 0) {
                return res.status(400).json({ message: "record does not exits or has been verified already" })
            } else {
                const { expiresAt } = UserOtpVerificationRecord[0];
                const hashedOTP = UserOtpVerificationRecord[0].otp;
                if (expiresAt < Date.now()) {
                    //user otp record has expired
                    await UserOtpVerifitcation.deleteMany({ userId });
                    return res.status(403).json({ message: "cod ehas expired please again request" })
                } else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP);
                    if (!validOTP) {
                        return res.status(401).json({ message: "Invalid code passed check in you inbox" })
                    } else {
                        await User.updateOne({ _id: userId }, { verified: true });
                        await UserOtpVerifitcation.deleteMany({ userId })
                        return res.status(200).json({ Status: verified, message: "user email verified successsfully" })
                    }

                }

            }
        }
    } catch (err) {
        console.log("some error in the ", err.message);
        return res.status(500).json({ message: "sone  inernal error or fail login" })
    }
}

///resend otp verification 

exports.resendOTPVerificationCode = async(req, res) => {
    try {


        const { userId, email } = req.body;
        if (!userId || !email) {
            return res.status(400).json({ message: "empty user ddetail are not allow" })
        } else {
            await UserOtpVerifitcation.deleteMany({ userId });
            sendOTPverificationEmail({ _id: userId, email }, res);
        }
    } catch (err) {
        res.json({
            status: "failed",
            message: err.message
        })
    }
}
