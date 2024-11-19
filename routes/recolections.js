const express = require('express');
const Recolections = require('../models/Recolections');

const router = express.Router();

/**
 * Crear una recolección
 */
router.post('/create', async (req, res) => {
    try {
        const { address, schedule, date, owner, company, textileTypes, description } = req.body;

        if (!address || !schedule || !date || !owner || !company) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        const recolection = await Recolections.create({
            address,
            schedule,
            date,
            owner,
            company,
            textileTypes,
            description: description || '',
        });

        res.status(201).json(recolection);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el servidor: ' + err.message });
    }
});

/**
 * Listar recolecciones por compañía
 */
router.get('/company/:companyId', async (req, res) => {
    try {
        const { companyId } = req.params;

        const recolections = await Recolections.find({ company: companyId }).populate('owner textileTypes company');

        res.json(recolections);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el servidor: ' + err.message });
    }
});

/**
 * Actualizar el estado de "accepted" de una recolección
 */
router.patch('/:id/accept', async (req, res) => {
    try {
        const { id } = req.params;
        const { accepted } = req.body;

        if (typeof accepted !== 'boolean') {
            return res.status(400).json({ error: 'El valor de "accepted" debe ser booleano' });
        }

        const updatedRecolection = await Recolections.findByIdAndUpdate(
            id,
            { accepted },
            { new: true }
        );

        if (!updatedRecolection) {
            return res.status(404).json({ error: 'Recolección no encontrada' });
        }

        res.json(updatedRecolection);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el servidor: ' + err.message });
    }
});

router.get('/accepted/:status', async (req, res) => {
    try {
        const { status } = req.params;
        const accepted = status === 'true';

        const recolections = await Recolections.find({ accepted }).populate('owner textileTypes company');

        res.json(recolections);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el servidor: ' + err.message });
    }
});

module.exports = router;
