const express = require('express');
const { query, validationResult } = require('express-validator');
const connection = require('../db/connection');

const router = express.Router();

router.get('/users', (req, res) => {
    connection.query('SELECT * FROM User', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

router.get(
    '/users/search',
    query('q').notEmpty(),
    (req, res) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            const { q } = req.query;

            connection.query(
                'SELECT * FROM User WHERE name LIKE ?',
                [`%${q}%`],
                (error, results) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    }
                    res.json(results);
                }
            );
        } else {
            res.status(400).json({ errors: result.array() });
        }
    }
);

module.exports = router;