const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Banco de dados
const DB_PATH = './db.json';
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ medidas: [] }, null, 2));
}

function lerDB() {
  return JSON.parse(fs.readFileSync(DB_PATH));
}

function salvarDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

// Rota para Arduino enviar dados
app.get('/update', (req, res) => {
  const { pressao, vazao } = req.query;
  if (pressao && vazao) {
    const db = lerDB();
    db.medidas.push({
      timestamp: new Date().toISOString(),
      pressao: parseFloat(pressao),
      vazao: parseFloat(vazao)
    });
    if (db.medidas.length > 50) db.medidas.shift();
    salvarDB(db);
  }
  res.sendStatus(200);
});


// Rota para frontend buscar dados
app.get('/dados.json', (req, res) => {
  const db = lerDB();
  res.json(db.medidas);
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
