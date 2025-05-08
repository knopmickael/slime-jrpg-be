const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key";

function authMiddleware(req, res, next) {
  if (req.path.startsWith("/api/auth")) {
    return next();
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Token não fornecido");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Token inválido ou expirado");
  }
}

module.exports = authMiddleware;
