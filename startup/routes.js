const express = require('express');
const person = require('../routes/person');
const auth = require('../routes/auth');

module.exports = function (app) {
    app
        .use(express.json()) // ou body-parser
        .use('/api/person', person)
        .use('/api/auth', auth)
}