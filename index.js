const express = require('express');
const routes = require('./src/routes');

const app = express();
app.use(express.json());
app.use(routes); // Usa as rotas que definimos

app.listen(3000, () => console.log('Servidor Profissional Rodando!'));