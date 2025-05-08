const express = require('express');
const db = require('./integrations/sqlite-conn');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    try {
        db.prepare('INSERT INTO users (username, password, unlocked_slimes) VALUES (?, ?, ?)')
          .run(username, password, '[]');
        res.status(201).send('Usuário registrado com sucesso');
    } catch (e) {
        res.status(400).send('Erro ao registrar usuário');
    }
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?')
                  .get(username, password);
    if (user) {
        res.json(user);
    } else {
        res.status(401).send('Credenciais inválidas');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
