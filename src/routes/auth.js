const express = require('express');
const db = require('../integrations/sqlite-conn');
const router = express.Router();

router.post('/register', (req, res) => {
    const { usermail, username, password } = req.body;
    try {
        db.prepare('INSERT INTO users (usermail, username, password) VALUES (?, ?, ?)')
          .run(usermail, username, password);
        res.status(201).send('Usuário registrado com sucesso');
    } catch (e) {
        res.status(400).send('Erro ao registrar usuário');
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?')
                  .get(username, password);
    if (user) {
        res.json(user);
    } else {
        res.status(401).send('Credenciais inválidas');
    }
});

module.exports = router;
