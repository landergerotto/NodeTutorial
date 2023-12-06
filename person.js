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
    .get('/api/person', async (req, res) => {
        try {
            const people = await Person.find();
            return res.status(200).send({ data: people });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    })
    .get('/api/person/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const person = await Person.findById(id);
            return res.status(200).json(person);
        } catch (error) {
            res.status(500).json({ error: error })
        }
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
    .patch('/api/person/:id', async (req, res) => {
        const { id } = req.params;
        if (!id)
            return res.status(400).send({ message: "No id provider" })

        const person = req.body;

        if (!person.salary)
            return res.status(400).send({ message: "No salary provider" })
        try {
            const newPerson = await Person.findByIdAndUpdate(
                id,
                { salary: person.salary }
            );
            return res.status(201).send(newPerson);
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    })
    .delete('/api/person/:id', async (req, res) => {
        const { id } = req.params;
        if (!id)
            return res.status(400).send({ message: "No id provider" });

        try {
            await Person.findByIdAndRemove(id);
            return res.status(200).send({ message: "Person deleted successfully" })
        } catch (error) {
            return res.status(500).send({ message: "Something failled" })
        }
    })
module.exports = router