const pool = require('../db');

const getOrdenesCompra = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT oc.id, oc.fecha, oc.total, ltrim(rtrim(p.nombre)) AS proveedor_nombre
        FROM ordenes_compra oc
        INNER JOIN proveedores p ON oc.proveedor_id = p.id
      `);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const getOrdenCompraById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT oc.id, oc.fecha, oc.total, ltrim(rtrim(p.nombre)) AS proveedor_nombre
      FROM ordenes_compra oc
      INNER JOIN proveedores p ON oc.proveedor_id = p.id
      WHERE oc.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Orden de compra no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const createOrdenCompra = async (req, res) => {
    const { fecha, total, proveedor_id } = req.body;
    try {
      const result = await pool.query(`
        INSERT INTO ordenes_compra (fecha, total, proveedor_id)
        VALUES ($1, $2, $3)
        RETURNING *
      `, [fecha, total, proveedor_id]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  
  const updateOrdenCompra = async (req, res) => {
    const { id } = req.params;
    const { fecha, total, proveedor_id } = req.body;
    try {
      const result = await pool.query(`
        UPDATE ordenes_compra
        SET fecha = $1, total = $2, proveedor_id = $3
        WHERE id = $4
        RETURNING *
      `, [fecha, total, proveedor_id, id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Orden de compra no encontrada' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  const deleteOrdenCompra = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(`
        DELETE FROM ordenes_compra
        WHERE id = $1
        RETURNING *
      `, [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Orden de compra no encontrada' });
      }
      res.json({ message: 'Orden de compra eliminada correctamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  module.exports = {
    getOrdenesCompra,
    getOrdenCompraById,
    createOrdenCompra,
    updateOrdenCompra,
    deleteOrdenCompra,
  };