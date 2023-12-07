const express = require('express');
const Person = require('../model/person');
const PersonController = require('../controller/PersonController');
const router = express.Router();

router
    .get('/api/person/first', (req, res) => {
        console.log("Hello in console");
        return
    })
    // .get('/params/:numero?', (req, res) => {
    //     // numero as variable
    //     const { numero } = req.params;
    //     res.send(`Número Recebido: ${numero}`)
    // })
    // .get('/query?', (req, res) => {
    //     //query?numero=1&numero2=3
    //     const { numero } = req.query;
    //     const { numero2 } = req.query;
    //     res.send(`Número Recebido: ${numero} e ${numero2}`)
    // })
    .get('/', PersonController.getAllUser)
    .get('/:id', PersonController.getUserById)
    .post('/', PersonController.create)
    .patch('/:id', PersonController.update)
    .delete('/:id', PersonController.delete)

module.exports = router