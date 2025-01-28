const express = require('express');
const router = express.Router();
const {
    getProductos,
    getProductById,
    createProduct,
    updateProduct,
    updateEstado,
    deleteProduct,
    resetProduct,
    getAll,
    getPapelera,
} = require('../controllers/productos.controller');



router.get('/allP', getAll);
router.get('/papelera', getPapelera);
router.get('/productos', getProductos);
router.get('/producto/:serial', getProductById);
router.post('/newProducto', createProduct);
router.put('/updateProducto/:serial', updateProduct);
router.put('/sendPapelera/:serial', updateEstado);
router.put('/resetProduct/:serial', resetProduct);
router.delete('/deleteProducto/:serial', deleteProduct);

module.exports = router;
