const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        await Event.create({
            name: req.body.name,
            date: req.body.date,
            description: req.body.description,
            lat: req.body.lat,
            long: req.body.long,
        });
        res.status(200).send("Evento creado!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during create");
    }

});

router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error obteniendo los eventos");
    }
});

router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).send("Evento no encontrado");
        }
        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error obteniendo el evento");
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                date: req.body.date,
                description: req.body.description,
                lat: req.body.lat,
                long: req.body.long,
            },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).send("Evento no encontrado");
        }

        res.json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error actualizando el evento");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);

        if (!deletedEvent) {
            return res.status(404).send("Evento no encontrado");
        }

        res.send("Evento eliminado");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error eliminando el evento");
    }
});

module.exports = router;