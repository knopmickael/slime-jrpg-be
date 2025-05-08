const express = require('express');
const db = require('../integrations/sqlite-conn');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET_KEY = 'your_secret_key';

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
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Credenciais inválidas');
    }
});

module.exports = router;
