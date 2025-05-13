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
    const { id } = req.auth; // Extracted from the token by authMiddleware
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
    const user = db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get(username);

    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    res.status(200).json(user);
  } catch (e) {
    res.status(500).send("Erro ao buscar usuário");
  }
};

const setLastPickedHero = (req, res) => {
  const { id } = req.body;

  try {
    const result = db.prepare("UPDATE users SET last_picked_hero = ?").run(id);

    if (result.changes === 0) {
      return res.status(404).send("Usuário não encontrado");
    }

    res.status(200).send("Último herói escolhido atualizado com sucesso");
  } catch (e) {
    res.status(500).send("Erro ao atualizar o último herói escolhido");
  }
};

module.exports = {
  listUsers,
  getCurrentUser,
  getUserByUsername,
  setLastPickedHero,
};
