const express = require('express');
const TextileType = require('../models/TextileType');
const User = require('../models/User');
const Company = require('../models/Company');

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { name, location, lat, lng, ownerIds, textileTypeIds } = req.body;

        if (!name || !location || lat == null || lng == null) {
            return res.status(400).json({ error: "Faltan datos necesarios para crear la compañía" });
        }

        const company = await Company.create({
            name,
            location,
            recolectionService: req.body.recolectionService,
            recompileSchema: req.body.recompileSchema,
            lat,
            lng,
            owners: ownerIds,
            textileTypes: textileTypeIds
        });

        res.status(201).json(company);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error en el servidor: " + err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const company = await Company.find();
        res.json(company);
    } catch (error) {
        res.status(500).send("Error obteniendo los textiles");
    }
});

module.exports = router;