const express = require('express');
const router = express.Router();
const {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} = require('../controllers/catagorias.controller'); // Ruta al archivo de controladores

// Ruta para obtener todas las categorías
router.get('/allCategorias', getCategorias);

// Ruta para obtener una categoría por ID
router.get('/categoria/:id', getCategoriaById);

// Ruta para crear una nueva categoría
router.post('/', createCategoria);

// Ruta para actualizar una categoría por ID
router.put('/:id', updateCategoria);

// Ruta para eliminar una categoría por ID
router.delete('/:id', deleteCategoria);

module.exports = router;
