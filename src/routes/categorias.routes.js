const express = require('express');
const router = express.Router();
const {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} = require('../controllers/catagorias.controller');



router.get('/allCategorias', getCategorias);
router.get('/categoria/:id', getCategoriaById);
router.post('/', createCategoria);
router.put('/:id', updateCategoria);
router.delete('/:id', deleteCategoria);

module.exports = router;
