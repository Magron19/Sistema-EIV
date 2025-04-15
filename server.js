// Importa os módulos necessários
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/index');

// Middleware para interpretar dados de formulários (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// Define a pasta 'public' como local para arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Define a engine de visualização como EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define o roteador principal
app.use('/', routes);

// Inicializa o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
