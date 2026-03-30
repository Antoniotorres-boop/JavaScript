require('dotenv').config();
const express = require('express');
const cors = require('cors'); // 1. Importa o CORS
const routes = require('./src/routes');
const logMiddleware = require('./src/middlewares/log');

const app = express();

app.use(cors()); // 2. Libera o acesso para qualquer site (modo desenvolvimento)
app.use(express.json());
app.use(logMiddleware);
app.use(routes);

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => {
    console.log(`🚀 Servidor Profissional e Aberto (CORS) na porta ${PORTA}`);
});