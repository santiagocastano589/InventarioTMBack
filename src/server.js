const express = require('express');
const cors = require('cors');
const articlesRoutes = require('./routes/articles');
const categoriasRoutes = require('./routes/categorias.routes');
const productosRoutes = require('./routes/productos.routes');
const proveedoresRoutes = require('./routes/proveedores.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/articles', articlesRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/productos', productosRoutes);
app.use('/proveedores', proveedoresRoutes);

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
