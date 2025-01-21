const pool = require('../db');

const getVentas = async (req, res) => {
  try {
    const result = await pool.query(`SELECT fecha, total, producto_serial, categoria_id FROM ventas`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getVentasById = async (req, res) => { 
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT fecha, total, producto_serial, categoria_id FROM ventas WHERE id = $1', [id]); 
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Venta no encontrada' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

const createVenta = async (req, res) => {
  const { fecha, total, producto_serial, categoria_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ventas (fecha, total, producto_serial, categoria_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [fecha, total, producto_serial, categoria_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateVenta = async (req, res) => {
  const { id } = req.params;
  const { fecha, total, producto_serial, categoria_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE ventas SET fecha = $1, total = $2, producto_serial = $3, categoria_id = $4 WHERE id = $5 RETURNING *',
      [fecha, total, producto_serial, categoria_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM ventas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.json({ message: 'Venta eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getVentas,
  getVentasById,
  createVenta,
  updateVenta,
  deleteVenta,
};
