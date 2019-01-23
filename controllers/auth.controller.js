const authentificationCtrl = {};
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");
const config = require('../config/config.js');
const Role = require('../models/role.model.js');
const User = require('../models/auth.model.js');

authentificationCtrl.login = (req, res) => {
    console.log("login...");
    User.findOne({
            email: req.body.email
        }).exec()
        .then(user => {
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    auth: false,
                    accessToken: null,
                    reason: "Invalid Password!"
                });
            }
            var token = jwt.sign({
                id: user._id
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({
                auth: true,
                accessToken: token,
                uid:user._id
            });
        })
        .catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Email o password incorrecto`
                });
            }
            return res.status(500).send({
                message: "No se pudo encoontrar este usuario " + req.body.email
            });
        });
};

authentificationCtrl.singup = (req, res) => {
    // Save User to Database
    console.log("Processing func -> SignUp");
    const currentDate = new Date();

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save().then(savedUser => {
        Role.find({
            'name': {
                $in: req.body.roles.map(role => role.toUpperCase())
            }
        }, (err, roles) => {
            if (err)
                res.status(500).send("Error -> " + err);

            // update User with Roles
            savedUser.roles = roles.map(role => role._id);
            savedUser.save(function (err) {
                if (err)
                    res.status(500).send("Error -> " + err);

                res.send("User registered successfully!");
            });
        });
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    });
};

authentificationCtrl.getUserData = (req, res) => {

    User.findById({
            _id: req.params.id
        })
        .select('-__v -password -created_at -updated_at')
        .populate('roles', '-_id -__v')
        .exec((err, user) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with _id = " + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving User with _id = " + req.params.id
                });
            }

            res.status(200).json({
                "description": "User Content Page",
                "user": user
            });
        });
};


authentificationCtrl.forgot = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec().then((userFound) => {
        const token = randomstring.generate({
            length: 20,
            charset: 'alphabetic'
        });
        userFound.resetPasswordToken = token;
        userFound.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        userFound.updated_at = Date.now()
        User.update({
            email: userFound.email
        }, {resetPasswordToken:token,
            resetPasswordExpires: Date.now() + 3600000,
            updated_at:Date.now()
        }).then((userUpdated) => {
            console.log(userUpdated);
            const smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'SendGrid',
                auth: {
                    user: '!!! YOUR SENDGRID USERNAME !!!',
                    pass: '!!! YOUR SENDGRID PASSWORD !!!'
                }
            });
            const mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err, success) {
                if (err) {
                    return res.status(500).send({
                        message: "Error sending message = " + req.body.email
                    });
                }
                res.status(200).json({
                    message: 'message send!!!'
                });
            });
        }).catch((err) => {
            console.log(err);
            return res.status(500).send({
                message: "Error updating " + req.body.email
            });
        });

    }).catch(error => {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with Username = " + req.body.emaal
            });
        }
        return res.status(500).send({
            message: "Error retrieving User with Username = " + req.body.email
        });
    });
};

authentificationCtrl.reset = (req, res) => {
    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }).exec().then((userFound) => {
        res.status(200).json({
            message: 'message send!!!',
            authorized: true
        });
    }).catch(error => {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with Username = " + req.body.email
            });
        }
        return res.status(500).send({
            message: "Error retrieving User with Username = " + req.body.email
        });
    });
};
module.exports = authentificationCtrl;