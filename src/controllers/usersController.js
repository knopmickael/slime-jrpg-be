const db = require("../integrations/sqlite-conn");
const { generateToken } = require("./authController");

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
  const { hero } = req.body;
  const { auth } = req;

  try {
    const result = db
      .prepare("UPDATE users SET last_picked_hero = ? WHERE id = ?")
      .run(JSON.stringify(hero), auth.id);

    if (result.changes === 0)
      return res.status(404).send("Usuário não encontrado");

    const newToken = generateToken({
      id: auth.id,
      username: auth.username,
      usermail: auth.usermail,
      profilePicture: auth.profilePicture,
      lastPickedHero: hero,
    });

    res.status(200).send(newToken);
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
