const express = require('express');
const Person = require('./model/person');
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
    .get('/psotkk', (req, res) => {
        return res.status(201).send({ data: people })
    })
    .post('/psotkk', async (req, res) => {
        const { name, oname, int } = req.body;

        if (!name || !oname || !int)
            return

        const obj =
        {
            name: name,
            lastname: oname,
            salary: int
        }

        try {
            const p = await Person.create(obj);
            return res.status(201).send({ message: "Pessoa inserida com sucesso", body: p })

        } catch (error) {
            return res.status(500).send({ error: error })
        }

    })
    .get('/api/person', async (req, res) => {
        try {
            const people = await Person.find();
            return res.status(200).send({ data: people });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    })


module.exports = router