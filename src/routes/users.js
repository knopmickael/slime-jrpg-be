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

router.get('/:username', (req, res) => {
    const { username } = req.params;

    try {
        const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        res.status(200).json(user);
    } catch (e) {
        res.status(500).send('Erro ao buscar usuário');
    }
});

module.exports = router;
