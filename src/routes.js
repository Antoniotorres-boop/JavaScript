const express = require('express');
const router = express.Router();
const produtoController = require('./controllers/produtoController');

router.get('/produtos', produtoController.listar);
router.post('/produtos', produtoController.criar);

module.exports = router;