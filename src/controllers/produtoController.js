const conectarBanco = require('../database/config');
const { z } = require('zod'); // Importa o Zod para validação

// 1. Definição das regras de validação (Schema)
const produtoSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  preco: z.number().positive("O preço deve ser um número positivo")
});

const produtoController = {
    // LISTAR (Read)
    async listar(req, res) {
        const db = await conectarBanco();
        const produtos = await db.all('SELECT * FROM produtos');
        res.json(produtos);
    },

    // CRIAR (Create) com Validação
    async criar(req, res) {
        try {
            // Valida os dados do corpo da requisição
            const dadosValidados = produtoSchema.parse(req.body);
            const { nome, preco } = dadosValidados;

            const db = await conectarBanco();
            await db.run('INSERT INTO produtos (nome, preco) VALUES (?, ?)', [nome, preco]);
            res.status(201).json({ mensagem: "Produto criado com sucesso!" });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ 
                    erro: "Dados inválidos", 
                    detalhes: error.errors.map(e => e.message) 
                });
            }
            res.status(500).json({ erro: "Erro interno no servidor" });
        }
    },

    // APAGAR (Delete)
    async remover(req, res) {
        const { id } = req.params;
        const db = await conectarBanco();
        const resultado = await db.run('DELETE FROM produtos WHERE id = ?', [id]);

        if (resultado.changes > 0) {
            res.json({ mensagem: `Produto ${id} removido!` });
        } else {
            res.status(404).json({ mensagem: "Produto não encontrado" });
        }
    }
};

module.exports = produtoController;