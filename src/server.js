const express = require("express");
const app = express();

const cors = require("cors");

const mainRouter = require("./routes/main");

app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" }));
app.use("/api", mainRouter);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
