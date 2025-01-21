const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {   
    try {
        const { rows } = await db.query('SELECT * FROM articles');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los artículos' });
    }
});

router.post('/', async (req, res) => {
    const { title, content } = req.body;

    try {
        const { rows } = await db.query(
            'INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING *',
            [title, content]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el artículo' });
    }
});

module.exports = router;
