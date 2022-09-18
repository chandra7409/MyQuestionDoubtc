const User = require('../models/user.model');
const { userStatus } = require('../Utils/constant');

exports.createSwimn = async(req, res) => {
    try {
        const data = {
            name: req.body.name,
            userId: req.body.userId,
            email: req.body.email,
            userStatus: req.body.userStatus,
            Task: req.body.Task
        }

        const user = await User.create(data);


        //Now we should send the notification request to notificationService
        /**
         * Enrich the content of the email content
         */


        console.log(`#### New User '${user.name}' created ####`);
        res.status(201).send(user);


    } catch (err) {
        console.log("#### Error while creating new user #### ", err);
        res.status(500).send({
            message: "Internal server error while creating new user"
        });
    }
}


exports.updateSwimn = async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        user.name = req.body.name ? req.body.name : user.name,
            user.Task = req.body.Task ? req.body.Task : user.Task,
            user.eamil = req.body.eamil ? req.body.eamil : user.eamil,
            user.userStatus = req.body.userStatus ? req.body.userStatus : user.userStatus,
            user.userId = req.body.userId ? req.body.userId : user.userId
        const updateSwimn = await user.save();

        console.log(`#### User data updated ####`);
        res.status(200).send(updateSwimn);

    } catch (err) {
        console.log("#### Error while updating user data #### ", err.message);
        res.status(500).send({
            message: "Internal server error while updating user data"
        });
    }
}

exports.deleteSwimn = async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        await user.remove();

        console.log(`#### User deleted ####`);
        res.status(200).send({ message: "User deleted" });

    } catch (err) {
        console.log("#### Error while deleting user #### ", err.message);
        res.status(500).send({
            message: "Internal server error while deleting user"
        });
    }
}




///////////////////////////const job = await Job.create({
// const user = await User.create({
//     Task: "Task",
//     userId: "userId",
//     email: email, //usually it will be picked by login user company
//     status: [],
// });
// console.log(user);
// user.Post.push({ user: userId });
// await user.save(); //save it in db