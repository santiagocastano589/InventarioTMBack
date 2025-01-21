const express = require('express');
const router = express.Router();
const {
  getOrdenesCompra,
  getOrdenCompraById,
  createOrdenCompra,
  updateOrdenCompra,
  deleteOrdenCompra,
} = require('../controllers/ordenCompra.controller');

router.get('/allOrdenes', getOrdenesCompra);
router.get('/orden/:id', getOrdenCompraById);
router.post('/', createOrdenCompra);
router.put('/:id', updateOrdenCompra);
router.delete('/:id', deleteOrdenCompra);

module.exports = router;
