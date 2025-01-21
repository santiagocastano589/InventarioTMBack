const express = require('express');
const router = express.Router();
const {
    getVentas,
    getVentasById,
    createVenta,
    updateVenta,
    deleteVenta,
} = require('../controllers/ventas.controller');



router.get('/allVentas', getVentas);
router.get('/venta/:id', getVentasById);
router.post('/', createVenta);
router.put('/:id', updateVenta);
router.delete('/:id', deleteVenta);

module.exports = router;
