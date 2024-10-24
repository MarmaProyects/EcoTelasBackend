const express = require('express');
const RecyclingPoints = require('../models/RecyclingPoints');

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        await RecyclingPoints.create({
            name: req.body.name,
            lat: req.body.lat,
            lng: req.body.lng,
        });
        res.status(200).send("Punto creado!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during registration");
    }

});
router.get('/', async (req, res) => {
    try {
        const points = await RecyclingPoints.find();
        res.json(points);
    } catch (error) {
        res.status(500).send("Error obteniendo los puntos");
    }
});

module.exports = router;