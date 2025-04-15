const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Caminho para o "banco de dados" JSON
const dbPath = path.join(__dirname, '../data/empreendimentos.json');

// Função para ler dados do JSON
function readData() {
  if (!fs.existsSync(dbPath)) return [];
  const data = fs.readFileSync(dbPath, 'utf-8');
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error('Erro ao ler JSON:', err);
    return [];
  }
}

// Função para salvar dados no JSON
function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Página inicial
router.get('/', (req, res) => {
  res.render('index');
});

// Página de cadastro
router.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

// Salvar novo empreendimento
router.post('/cadastro', (req, res) => {
  const empreendimentos = readData();
  const novo = {
    id: Date.now(),
    ...req.body
  };
  empreendimentos.push(novo);
  writeData(empreendimentos);
  res.redirect('/consulta');
});

// Página de consulta/listagem
router.get('/consulta', (req, res) => {
  const empreendimentos = readData();
  res.render('consulta', { empreendimentos });
});

// Página para editar empreendimento
router.get('/editar/:id', (req, res) => {
  const empreendimentos = readData();
  const item = empreendimentos.find(e => e.id == req.params.id);
  if (!item) return res.status(404).send('Empreendimento não encontrado');
  res.render('editar', { item });
});

// Salvar edição
router.post('/editar/:id', (req, res) => {
  let empreendimentos = readData();
  empreendimentos = empreendimentos.map(e =>
    e.id == req.params.id ? { ...e, ...req.body } : e
  );
  writeData(empreendimentos);
  res.redirect('/consulta');
});

// Excluir empreendimento
router.post('/excluir/:id', (req, res) => {
  let empreendimentos = readData();
  empreendimentos = empreendimentos.filter(e => e.id != req.params.id);
  writeData(empreendimentos);
  res.redirect('/consulta');
});

module.exports = router;
