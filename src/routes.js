const express = require('express');
const router = express.Router();
const produtoController = require('./controllers/produtoController');

router.get('/produtos', produtoController.listar);
router.post('/produtos', produtoController.criar);
router.delete('/produtos', produtoController.remover);

module.exports = router;