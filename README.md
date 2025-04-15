# Sistema EIV

Sistema de cadastro e consulta de empreendimentos voltado para o gerenciamento de Estudos de Impacto de Vizinhança (EIV). Desenvolvido com Node.js, EJS e armazenamento em arquivos JSON, o sistema é simples, funcional e ideal para fins acadêmicos ou como base para aplicações mais robustas.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [EJS](https://ejs.co/)
- HTML5, CSS3
- JavaScript
- JSON (como banco de dados)

## 📦 Funcionalidades

- Cadastro de empreendimentos
- Consulta de empreendimentos cadastrados
- Edição e exclusão de registros
- Interface amigável e fácil de usar
- Armazenamento local em arquivo JSON

## 📁 Estrutura do Projeto

```
Sistema-EIV/
├── data/                  # Banco de dados em JSON
│   └── empreendimentos.json
├── public/
│   └── styles/            # Estilos CSS
│       └── style.css
├── routes/                # Arquivo de rotas do sistema
│   └── index.js
├── views/                 # Arquivos EJS das páginas
│   ├── index.ejs
│   ├── cadastro.ejs
│   ├── consulta.ejs
│   └── editar.ejs
├── server.js              # Servidor principal do Node.js
├── package.json           # Dependências e scripts
└── README.md              # Documentação do projeto
```

## 💻 Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/Magron19/Sistema-EIV.git
   cd Sistema-EIV
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   node server.js
   ```

4. Acesse o sistema:
   ```
   http://localhost:3000
   ```

## 🔧 Requisitos

- Node.js instalado (versão 14+ recomendada)

## 📌 Observações

- O sistema ainda está em desenvolvimento. Melhorias no layout e responsividade seram implementadas.
- O armazenamento é local e não persistente entre ambientes (ideal para testes e apresentações acadêmicas).

## 👨‍💻 Autor

Desenvolvido por **Felipe Magron**  
📧 felipemagron@gmail.com  
🔗 [LinkedIn]: (https://www.linkedin.com/in/felipe-magron/)
🔐 Projeto privado hospedado no GitHub

