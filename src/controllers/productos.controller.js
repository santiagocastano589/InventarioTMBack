const pool = require('../db');

const getProductos = async (req, res) => {
  try {
    const result = await pool.query(`SELECT 
        p.serial, 
        ltrim(rtrim(p.nombre)) nombre, 
        ltrim(rtrim(p.descripcion)) descripcion, 
        p.precio, 
        p.cantidad, 
        c.id AS categoria_id, 
        pr.id AS proveedor_id
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN proveedores pr ON p.proveedor_id = pr.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getProductById = async (req, res) => { 
    const { serial } = req.params;
    try {
      const result = await pool.query(`SELECT 
        p.serial, 
        ltrim(rtrim(p.nombre)) nombre, 
        ltrim(rtrim(p.descripcion)) descripcion, 
        p.precio, 
        p.cantidad, 
        c.id AS categoria_id, 
        pr.id AS proveedor_id
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN proveedores pr ON p.proveedor_id = pr.id WHERE serial = $1`, [serial]); 
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

const createProduct = async (req, res) => {
  const { nombre, descripcion, precio, cantidad } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO productos (serial, nombre, descripcion, precio, cantidad, categoria_id, proveedor_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, descripcion, precio, cantidad, categoria_id, proveedor_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { serial } = req.params;
  const { nombre, descripcion, precio, cantidad, categoria_id, proveedor_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, cantidad = $4, categoria_id = $5, proveedor_id = $6 WHERE serial = $7 RETURNING *',
      [nombre, descripcion, precio, cantidad, categoria_id, proveedor_id, serial]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { serial } = req.params;
  try {
    const result = await pool.query('DELETE FROM producto WHERE serial = $1 RETURNING *', [serial]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProductos,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
