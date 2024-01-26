const express = require('express');
const AuthController = require('../controller/AuthController');
const router = express.Router();

router
    .post('/register', AuthController.register)
    .post('/login', AuthController.login)
    .post('/registerC', AuthController.registerCrypto)
    .post('/loginC', AuthController.loginCrypto)

module.exports = router;
