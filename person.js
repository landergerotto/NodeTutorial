const express = require('express');
const router = express.Router();

const people = []

router
    .get('/api/person/first', (req, res) => {
        console.log("Hello in console");
        return
    })
    .get('/params/:numero?', (req, res) => {
        // numero as variable
        const { numero } = req.params;
        res.send(`Número Recebido: ${numero}`)
    })
    .get('/query?', (req, res) => {
        //query?numero=1&numero2=3
        const { numero } = req.query;
        const { numero2 } = req.query;
        res.send(`Número Recebido: ${numero} e ${numero2}`)
    })
    .post('/psotkk', (req, res) => {
        const { name, oname, int} = req.body;
        const obj = 
        {
            name : name,
            oname: oname,
            int: int
        }
        people.push(obj)
        console.log(people)
        return res.status(201).send({message: 'AEEEEEEEEEEE'})
    })

module.exports = router