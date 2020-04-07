// const authentificationCtrl = {};
// const bcrypt = require('bcryptjs');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const jwt = require('jsonwebtoken');
// const randomstring = require("randomstring");
// const config = require('../config/config.js');
// const User = require('../models/auth.model.js');


// // user login
// authentificationCtrl.login = (req, res,next) => {
    
//     User.findOne({
//             email: req.body.email
//         }).exec()
//         .then(user => {
//             var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//             if (!passwordIsValid) {
//                 return res.status(401).send({
//                     message: "Usuario o Clave invalido",
//                     reason: "Dato invalido.!"
//                 });
//             }
//             var token = jwt.sign({
//                 id: user._id
//             }, config.secret, {
//                 expiresIn: 86400 // expires in 24 hours
//             });

//             res.status(200).send({
//                 uid: user._id,
//                 authorized: true,
//                 accessToken: token,
//                 refreshToken: null,
//                 expiresIn: 86400
//             });
//         })
//         .catch(error => {
//             if (error.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: `Email o password incorrecto`
//                 });
//             }
//             return res.status(500).send({
//                 reason: "No se pudo encontrar este usuario " + req.body.email,
//                 message: "No se pudo encontrar este usuario " + req.body.email
//             });
//         });
// }

// // ======================================================================= //
// //                  create user
// // ====================================================================== //
// // Create User
// authentificationCtrl.signup = (req, res) => {
//     // req.assert('username', 'Name cannot be blank').notEmpty();
//     // req.assert('email', 'Email is not valid').isEmail();
//     // req.assert('email', 'Email cannot be blank').notEmpty();
//     // req.assert('password', 'Password must be at least 4 characters long').len(4);
//     // // check validation errors.
//     // var errors = req.validationErrors();
//     // if (errors) {
//     //     return res.status(400).send(errors);
//     // }
//     // Save User to Database
//     const token = randomstring.generate({
//         length: 20,
//         charset: 'alphabetic'
//     });
//     const user = new User({
//         username: req.body.username,
//         email: req.body.email,
//         role: req.body.role.toUpperCase(),
//         verifiedToken: token,
//         verifiedTokenExpires: 259200,
//         password: bcrypt.hashSync(req.body.password, 8)
//     });
//     user.save().then(userSaved => {
//         // Create a verification token for this user
//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: config.senderMail,
//                 pass: config.senderPassword
//             }
//         });
//         var mailOptions = {
//             from: config.senderMail,
//             to: userSaved.email,
//             subject: 'Verificación de cuenta.',
//             text: 'Bienvenido /da a nuestra plataforma,\n\n' + 'Haga clic en el link que se muestra a continuación para completar el proceso de registro de su cuenta.: \nhttp:\/\/' + req.headers.host + '\/api\/' + '\/confirmation\/' + token + '.\n'
//         };
//         transporter.sendMail(mailOptions, function (err) {
//             if (err) {
//                 return res.status(500).send({
//                     msg: err.message
//                 });
//             }
//             var _token = jwt.sign({
//                 id: user._id
//             }, config.secret, {
//                 expiresIn: 86400 // expires in 24 hours
//             });

//             res.status(200).send({
//                 message: "Se ha enviado un mensaje a su correo: " + req.body.email,
//                 uid: userSaved._id,
//                 authorized: true,
//                 accessToken: _token,
//                 refreshToken: null,
//                 expiresIn: 86400
//             });

//         }).catch(err => {
//             res.status(500).send({
//                 reason: "No se pudo efectuar la operacion" + req.body.email,
//                 message: "El usuario no se guardo."
//             });
//         });
//     });
// };

// // ======================================================================= //
// //                  get user by id
// // ====================================================================== //
// authentificationCtrl.getUserData = (req, res) => {
//     User.findById({
//             _id: req.params.id
//         })
//         .select('-__v -password -created_at -updated_at')
//         .exec((err, user) => {
//             if (err) {
//                 if (err.kind === 'ObjectId') {
//                     return res.status(404).send({
//                         message: "No existe usuario con este id." + req.params.id
//                     });
//                 }
//                 return res.status(500).send({
//                     message: "Ha ocurrido un error inesperado, intente otra vez." + req.params.id
//                 });
//             }
//             res.status(200).json(user);
//         });
// };


// // ======================================================================= //
// //                  forgot password
// // ====================================================================== //
// authentificationCtrl.forgot = (req, res) => {
//     User.findOne({
//         email: req.body.email
//     }).exec().then((userFound) => {
//         const token = randomstring.generate({
//             length: 20,
//             charset: 'alphabetic'
//         });
//         userFound.resetPasswordToken = token;
//         userFound.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//         userFound.updated_at = Date.now()
//         User.update({
//             email: userFound.email
//         }, {
//             resetPasswordToken: token,
//             resetPasswordExpires: Date.now() + 3600000,
//             updated_at: Date.now()
//         }).then((userUpdated) => {
//             console.log(userUpdated);
//             const smtpTransport = nodemailer.createTransport('SMTP', {
//                 service: 'SendGrid',
//                 auth: {
//                     user: '!!! YOUR SENDGRID USERNAME !!!',
//                     pass: '!!! YOUR SENDGRID PASSWORD !!!'
//                 }
//             });
//             const mailOptions = {
//                 to: user.email,
//                 from: 'passwordreset@demo.com',
//                 subject: 'Node.js Password Reset',
//                 text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//                     'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//                     'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//                     'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//             };
//             smtpTransport.sendMail(mailOptions, function (err) {
//                 if (err) {
//                     return res.status(500).send({
//                         message: "Error sending message = " + req.body.email
//                     });
//                 }
//                 res.status(200).json({
//                     message: 'message send!!!'
//                 });
//             });
//         }).catch((err) => {
//             console.log(err);
//             return res.status(500).send({
//                 message: "Error updating " + req.body.email
//             });
//         });

//     }).catch(error => {
//         console.log(error);
//         if (error.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with Username = " + req.body.emaal
//             });
//         }
//         return res.status(500).send({
//             message: "Error retrieving User with Username = " + req.body.email
//         });
//     });
// };

// // ======================================================================= //
// //                  Reset Password
// // ====================================================================== //
// authentificationCtrl.reset = (req, res) => {
//     User.findOne({
//         resetPasswordToken: req.params.token,
//         resetPasswordExpires: {
//             $gt: Date.now() - 259200
//         }
//     }).exec().then((userFound) => {
//         res.status(200).json({
//             message: 'message send!!!',
//             authorized: true
//         });
//     }).catch(error => {
//         if (error.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with Username = " + req.body.email
//             });
//         }
//         return res.status(500).send({
//             message: "Error retrieving User with Username = " + req.body.email
//         });
//     });
// };

// // ======================================================================= //
// //                  confirm email
// // ====================================================================== //

// authentificationCtrl.confirmation = (req, res) => {
//     User.findOne({
//         verifiedToken: req.params.token,
//         verifiedTokenExpires: {
//             $gt: Date.now()
//         }
//     }).exec().then((userFound) => {
//         if (userFound.verified) {
//             return res.status(400).json({
//                 message: 'El usuario ha sido verificado anteriormente.'
//             });
//         }
//         res.status(200).json({
//             message: 'EL usuario se verificó correctamente.',
//         });
//     }).catch(error => {
//         if (error.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "El token es invalido y/o vencido."
//             });
//         }
//         return res.status(500).send({
//             message: "Ha ocurrido un error recuperando verificando el usuario."
//         });
//     });
// };
// module.exports = authentificationCtrl;
