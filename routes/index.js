  const express = require('express');
  const router = express.Router();
  const fs = require('fs');
  const path = require('path');
  const fetch = require('node-fetch'); // precisa do pacote node-fetch

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

  // Função para buscar latitude e longitude no Nominatim
  async function getGeolocation(enderecoCompleto) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto)}&limit=1`;
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'eiv-system/1.0 (seu-email@dominio.com)' }
      });
      const data = await response.json();
      if (data && data.length > 0) {
        return {
          latitude: data[0].lat,
          longitude: data[0].lon
        };
      }
      return { latitude: '', longitude: '' };
    } catch (err) {
      console.error('Erro ao buscar localização:', err);
      return { latitude: '', longitude: '' };
    }
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
  router.post('/cadastro', async (req, res) => {
    const empreendimentos = readData();

    const { país, cidade, endereco, numero, ...outros } = req.body;
    const enderecoCompleto = `${endereco}, ${numero}, ${cidade}, ${país}`;
    const { latitude, longitude } = await getGeolocation(enderecoCompleto);

    const novo = {
      id: Date.now(),
      país,
      cidade,
      endereco,
      numero,
      latitude,
      longitude,
      ...outros
    };

    empreendimentos.push(novo);
    writeData(empreendimentos);
    res.redirect('/consulta');
  });

  // Página de consulta
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
  router.post('/editar/:id', async (req, res) => {
    let empreendimentos = readData();

    const { país, cidade, endereco, numero, ...outros } = req.body;
    const enderecoCompleto = `${endereco}, ${numero}, ${cidade}, ${país}`;
    const { latitude, longitude } = await getGeolocation(enderecoCompleto);

    empreendimentos = empreendimentos.map(e =>
      e.id == req.params.id
        ? {
            ...e,
            país,
            cidade,
            endereco,
            numero,
            latitude,
            longitude,
            ...outros
          }
        : e
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
