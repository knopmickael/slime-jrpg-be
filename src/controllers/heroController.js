const db = require("../integrations/sqlite-conn");

const listHeroes = (_, res) => {
  try {
    const heros = db.prepare("SELECT * FROM heroes").all();
    res.status(200).json(heros);
  } catch (e) {
    res.status(400).send("Erro ao listar heróis");
  }
};

const getHeroByName = (req, res) => {
  const { name } = req.params;

  try {
    const hero = db.prepare("SELECT * FROM heros WHERE name = ?").get(name);

    if (!hero) {
      return res.status(404).send("Herói não encontrado");
    }

    res.status(200).json(hero);
  } catch (e) {
    res.status(500).send("Erro ao buscar herói");
  }
};

module.exports = { listHeroes, getHeroByName };
