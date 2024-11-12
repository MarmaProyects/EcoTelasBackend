const express = require('express');
const TextileType = require('../models/TextileType');

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ error: "Se necesita ingresar el nombre del tipo de textil" });
        }

        const textile = await TextileType.create({
            name: req.body.name,
            description: req.body.description || ""
        });

        res.status(201).json(textile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error en el servidor: " + err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const textile = await TextileType.find();
        res.json(textile);
    } catch (error) {
        res.status(500).send("Error obteniendo los textiles");
    }
});

module.exports = router;