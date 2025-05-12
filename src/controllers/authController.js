const db = require("../integrations/sqlite-conn");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key";

const register = (req, res) => {
  const { usermail, username, password } = req.body;
  try {
    db.prepare(
      "INSERT INTO users (usermail, username, password, profile_picture) VALUES (?, ?, ?, ?)"
    ).run(
      usermail,
      username,
      password,
      "https://1drv.ms/i/c/4ddf50075e4db0e6/IQSjg14FoQolRrm-tvHe9_0yAXDIbwzxD0ifsnTMxig_ONs?width=1024"
    );
    res.status(201).send("Usuário registrado com sucesso");
  } catch (e) {
    res.status(400).send("Erro ao registrar usuário");
  }
};

const login = (req, res) => {
  const { username, password } = req.body;
  const user = db
    .prepare("SELECT * FROM users WHERE username = ? AND password = ?")
    .get(username, password);
  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username, usermail: user.usermail, profilePicture: user.profile_picture },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(401).send("Credenciais inválidas");
  }
};

module.exports = { register, login };
