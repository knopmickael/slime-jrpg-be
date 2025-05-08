const express = require('express');
const db = require('../integrations/sqlite-conn');
const router = express.Router();

router.get('/list', (_, res) => {
    try {
        const users = db.prepare('SELECT * FROM users').all();
        res.status(200).json(users);
    } catch (e) {
        res.status(400).send('Erro ao registrar usuário');
    }
});

module.exports = router;
