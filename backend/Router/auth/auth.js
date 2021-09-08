const express = require("express");
const router = express.Router();

//Validations
const {
    validSign,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator,
}  = require('../../helpers/valid.js');

//Load Controllers
const {
    registerController,
    activationController,
    loginController,
    forgotPasswordController,
    resetPasswordController,
} = require('./authController.js');

router.post('/register', validSign,registerController);
router.post('/activation', activationController);
router.post('/login',validLogin,loginController);

router.put('/forgotpassword',forgotPasswordValidator,forgotPasswordController);
router.put('/resetpassword',resetPasswordValidator,resetPasswordController);

module.exports =  router;
