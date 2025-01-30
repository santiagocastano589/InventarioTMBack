const express = require('express');
const router = express.Router();
const {
    getProviders,
    getProviderById,
    createProvider,
    updateProvider,
    deleteProvider,
} = require('../controllers/proveedores.controller'); 



router.get('/allProveedores', getProviders);
router.get('/proveedor/:id', getProviderById);
router.post('/', createProvider);
router.put('/updateProvider/:id', updateProvider);
router.delete('/:id', deleteProvider);

module.exports = router;
