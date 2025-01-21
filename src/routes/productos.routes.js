const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productos.controller'); // Ruta al archivo de controladores

// Ruta para obtener todas las categorías
router.get('/allProducts', getProducts);

// Ruta para obtener una categoría por ID
router.get('/producto/:id', getProductById);

// Ruta para crear una nueva categoría
router.post('/', createProduct);

// Ruta para actualizar una categoría por ID
router.put('/:id', updateProduct);

// Ruta para eliminar una categoría por ID
router.delete('/:id', deleteProduct);

module.exports = router;
