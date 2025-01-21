const express = require('express');
const router = express.Router();
const {
    getProductos,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productos.controller');



router.get('/allProducts', getProductos);
router.get('/producto/:serial', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
