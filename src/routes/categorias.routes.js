const express = require('express');
const router = express.Router();
const {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  updateCategoryState,
} = require('../controllers/catagorias.controller');


router.get('/allCategorias', getCategorias);
router.get('/categoria/:id', getCategoriaById);
router.post('/newCategoria', createCategoria);
router.put('/updateCategoria/:id', updateCategoria);
router.delete('/updateEstadoCategoria/:id', updateCategoryState);

module.exports = router;
