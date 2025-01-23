const express = require('express');
const router = express.Router();
const {
    getProductos,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productos.controller');



router.get('/productos', getProductos);
router.get('/producto/:serial', getProductById);
router.post('/newProducto', createProduct);
router.put('/updateProducto/:serial', updateProduct);
router.delete('/deleteProducto/:serial', deleteProduct);

module.exports = router;
