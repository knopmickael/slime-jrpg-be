const db = require("../integrations/sqlite-conn");

const listUsers = (_, res) => {
  try {
    const users = db.prepare("SELECT * FROM users").all();
    res.status(200).json(users);
  } catch (e) {
    res.status(400).send("Erro ao listar usuários");
  }
};

const getCurrentUser = (req, res) => {
  try {
    const { id } = req.user; // Extracted from the token by authMiddleware
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    res.status(200).json(user);
  } catch (e) {
    res.status(500).send("Erro ao buscar usuário");
  }
};

const getUserByUsername = (req, res) => {
  const { username } = req.params;

  try {
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    res.status(200).json(user);
  } catch (e) {
    res.status(500).send("Erro ao buscar usuário");
  }
};

module.exports = { listUsers, getCurrentUser, getUserByUsername };
