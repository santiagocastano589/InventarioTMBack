const pool = require('../db');


const getPapelera = async (req, res) => {
  try {
    const result = await pool.query(`SELECT 
        p.serial, 
        ltrim(rtrim(p.nombre)) nombre, 
        ltrim(rtrim(p.descripcion)) descripcion, 
        p.precio, 
        p.cantidad,
        p.estado,
        c.id AS categoria_id,
        ltrim(rtrim(c.nombre)) AS categoria_nombre,
        pr.id AS proveedor_id,
        ltrim(rtrim(pr.nombre)) AS proveedor_nombre
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN proveedores pr ON p.proveedor_id = pr.id where p.estado = 0
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAll = async (req, res) => {
  try {
    const result = await pool.query(`SELECT 
        p.serial, 
        ltrim(rtrim(p.nombre)) nombre, 
        ltrim(rtrim(p.descripcion)) descripcion, 
        p.precio, 
        p.cantidad,
        p.estado,
        c.id AS categoria_id,
        ltrim(rtrim(c.nombre)) AS categoria_nombre,
        pr.id AS proveedor_id,
        ltrim(rtrim(pr.nombre)) AS proveedor_nombre
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN proveedores pr ON p.proveedor_id = pr.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




const getProductos = async (req, res) => {
  try {
    const result = await pool.query(`SELECT 
        p.serial, 
        ltrim(rtrim(p.nombre)) nombre, 
        ltrim(rtrim(p.descripcion)) descripcion, 
        p.precio, 
        p.cantidad,
        p.estado,
        c.id AS categoria_id,
        ltrim(rtrim(c.nombre)) AS categoria_nombre,
        pr.id AS proveedor_id,
        ltrim(rtrim(pr.nombre)) AS proveedor_nombre
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN proveedores pr ON p.proveedor_id = pr.id WHERE p.estado = 1;
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
        p.estado,
        c.id AS categoria_id,
        ltrim(rtrim(c.nombre)) AS categoria_nombre,
        pr.id AS proveedor_id,
        ltrim(rtrim(pr.nombre)) AS proveedor_nombre
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
  
;

const createProduct = async (req, res) => {
  const { serial, nombre, descripcion, precio, cantidad, categoria_id, proveedor_id } = req.body;

  try {
    const existingProduct = await pool.query(
      'SELECT * FROM productos WHERE serial = $1', [serial]
    );

    if (existingProduct.rows.length > 0) {
      return res.status(400).json({ error: 'El serial ya está registrado.' });
    }

    const result = await pool.query(
      `INSERT INTO productos (serial, nombre, descripcion, precio, cantidad, categoria_id, proveedor_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [serial, nombre, descripcion, precio, cantidad, categoria_id, proveedor_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateProduct = async (req, res) => {
  const { serial } = req.params;
  const { nombre, descripcion, precio, cantidad } = req.body;
  try {
    const result = await pool.query(
      'UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, cantidad = $4 WHERE serial = $5 RETURNING *',
      [nombre, descripcion, precio, cantidad, serial]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const updateEstado = async (req, res) => {
  const { serial } = req.params;
  try {
    const result = await pool.query(
      'UPDATE productos SET estado = 0 WHERE serial = $1 RETURNING *',
      [serial]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const resetProduct = async (req, res) => {
  const { serial } = req.params;
  try {
    const result = await pool.query(
      'UPDATE productos SET estado = 1 WHERE serial = $1 RETURNING *',
      [serial]
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
    const result = await pool.query('DELETE FROM productos WHERE serial = $1 RETURNING *', [serial]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getProductos,
  getProductById,
  createProduct,
  updateProduct,
  updateEstado,
  deleteProduct,
  resetProduct,
  getPapelera,
};
