const conectarBanco = require('../database/config');

const produtoController = {
    async listar(req, res) {
        const db = await conectarBanco();
        const produtos = await db.all('SELECT * FROM produtos');
        res.json(produtos);
    },
    
    async criar(req, res) {
        const { nome, preco } = req.body;
        const db = await conectarBanco();
        await db.run('INSERT INTO produtos (nome, preco) VALUES (?, ?)', [nome, preco]);
        res.status(201).json({ mensagem: "Produto criado!" });
    }
    // Adicione aqui o delete e o put depois...
};

module.exports = produtoController;